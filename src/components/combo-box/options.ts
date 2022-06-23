//мок для опций в выпадающем списке
import { randText } from '@ngneat/falso';

let options: string[] = [];
for (let i = 0; i < 10; i++) {
  options.push(randText({ locale: 'en' }));
}

export { options };
