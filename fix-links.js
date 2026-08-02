const fs = require('fs');

['src/components/layout/Footer.tsx', 'src/components/layout/Header.tsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/href={{pathname: pathname as any, params: params as any}}/g, 'href={{pathname: pathname as any, params: params as any} as any}');
  fs.writeFileSync(file, content);
});
console.log('Fixed Link href types!');
