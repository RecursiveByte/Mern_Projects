import bcrypt from 'bcrypt';

const password = 'admin123';
const saltRounds = 10;

// Hashing
bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
    return ;
  }

  console.log('Hashed Password:', hash);

  // Verifying
  bcrypt.compare(password, hash, (err, result) => {
    if (err) {
      console.error('Error comparing password:', err);
      return;
    }

    console.log('Password Match:', result); // true
  });
});
