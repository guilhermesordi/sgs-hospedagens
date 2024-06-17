const pgp = require('pg-promise')();
const db = pgp('postgresql://postgres:Xt3"vS94qw-1".4t-&@db.vigcjlqbzziogtorkvxz.supabase.co:5432/postgres');

module.exports = {
  db,
};
