import PgPool from "../db/postgres.js"

export const getUserDetails = async (email) => {
  const data = await PgPool.pgPool.query('Select id, email, name from users where email = $1;', [email]);
  if (data && data.rows && data.rows.length > 0) return data.rows[0];
  return {};
}

export const verifyUserFromDb = async (user) => {
  const data = await PgPool.pgPool.query('Select id, email, name from users where email = $1 and password = $2;', [user.email, user.password]);
  if (data && data.rows && data.rows.length > 0) return data.rows[0];
  return {};
}

export const registerUserToDb = async (user) => {
  const data = await PgPool.pgPool.query('Insert into users (name, email, password) values ( $1, $2, $3) returning id;', [user.name, user.email, user.password]);
  return data.rows[0];
}

export const findUsersFromDb = async (filterObject, userId) => {
  let filterCondition;
  if (Object.keys(filterObject).length > 0) {
    Object.entries(filterObject).forEach(([col, value]) => {
      if (value) {
        if (filterCondition) {
          filterCondition += ` OR ${col} ILIKE '%${value}%'`;
        } else {
          filterCondition = `${col} ILIKE '%${value}%'`;
        }
      }
    });
  }
  if (!filterCondition) {
    filterCondition = `id != '${userId}'`;
  } else {
    filterCondition = `(${filterCondition}) AND id != '${userId}'`;
  }
  const data = await PgPool.pgPool.query(`Select id, email, name from users where ${filterCondition};`);
  return data.rows;
}

export const getAccountDetails = async (userId) => {
  const data = await PgPool.pgPool.query('Select id, balance from accounts where user_id = $1;', [userId]);
  if (data && data.rows && data.rows.length > 0) return data.rows[0];
  return {};
}

export const createAccount = async (userId) => {
  const data = await PgPool.pgPool.query('Insert into accounts (user_id, balance) values ($1, $2) returning id;', [userId, 500]);
  return data.rows[0];
}

export const updateAccountBalance = async (userId, balance) => {
  const data = await PgPool.pgPool.query('Update accounts SET balance = $1 where user_id = $2;', [balance, userId]);
  return data;
}

export const writeTransaction = async (sender_id, receiver_id, amount) => {
  const data = await PgPool.pgTransactions(async (pgPoolClient)=> {
    const receiverAccountData = await pgPoolClient.query('Update accounts SET balance = balance + $1 where user_id = $2;', [amount, receiver_id]);
    const senderAccountData = await pgPoolClient.query('Update accounts SET balance = balance - $1 where user_id = $2;', [amount, sender_id]);
    const transactionData = await pgPoolClient.query('INSERT INTO transactions ( sender_id, receiver_id, amount) VALUES ($1, $2, $3) returning id;', [sender_id, receiver_id, amount]);
    return transactionData.rows[0];
  });
  return data;
}
