document.getElementById('password').value = '';
document.getElementById('length').addEventListener('input', function() {
  document.getElementById('lengthValue').textContent = this.value;
});

document.getElementById('passwordForm').addEventListener('submit', function(event) {
  event.preventDefault();

  let length = document.getElementById('length').value;
  let upper = document.getElementById('upper').checked;
  let lower = document.getElementById('lower').checked;
  let num = document.getElementById('num').checked;
  let symbol = document.getElementById('symbol').checked;

  let password = generatePassword(length, upper, lower, num, symbol);
  document.getElementById('password').value = password;

  document.getElementById('copyButton').disabled = false;

  let strengthText = document.querySelector('.status p');
  let strengthImage = document.querySelector('.status img');

  let strengthResult = checkStrength(length, upper, lower, num, symbol);
  strengthText.textContent = strengthResult.text;
  strengthImage.src = strengthResult.imageUrl;

});

document.getElementById('copyButton').addEventListener('click', function() {
  let passwordField = document.getElementById('password');
  passwordField.select();
  document.execCommand('copy');
});


function checkStrength(length, upper, lower, num, symbol) {
  let score = 0;
  if (length >= 8 && length <= 12) {
    score += 2;
  } else if (length >= 13 && length <= 16) {
    score += 4;
  } else if (length >= 17 && length <= 20) {
    score += 6;
  }

  let types = [upper, lower, num, symbol];
  let includedTypes = types.filter(type => type === true).length;

  score += includedTypes;
  if (score <= 3) {
    text = 'Too weak';
    imageUrl = 'assets/images/tooweak.png';
  } else if (score <= 6) {
    text = 'Weak';
    imageUrl = 'assets/images/weak.png';
  } else if (score <= 9) {
    text = 'Medium';
    imageUrl = 'assets/images/medium.png';
  } else {
    text = 'Strong';
    imageUrl = 'assets/images/strong.png';
  }

  return { text: text, imageUrl: imageUrl };
}



function generatePassword(length, upper, lower, num, symbol) {
  let charset = '';
  let password = '';

  if (upper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lower) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (num) charset += '0123456789';
  if (symbol) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return password;
}
