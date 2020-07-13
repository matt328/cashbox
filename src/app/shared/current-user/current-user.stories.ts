import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata } from '@storybook/angular';
import { IconRegistryModule } from '../../icon-registry.module';
import { CurrentUserComponent } from './current-user.component';

export default {
  title: 'Current User Component',
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        IconRegistryModule,
        HttpClientModule,
      ],
    }),
  ],
};

export const development = () => ({
  component: CurrentUserComponent,
  props: {
    imageSource: 'https://lh3.googleusercontent.com/ogw/ADGmqu9ssSDBqWmPwfdiPFLXtBsXOpjxd3JQtcy0Hdhe=s32-c-mo',
    userName: 'Matt Teeter',
    email: 'matt328@gmail.com',
  },
});
