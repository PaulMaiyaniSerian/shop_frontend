import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import AppWrapper from './AppWrapper.vue'
import router from './router'

// import './assets/main.css'

// import 'primevue/resources/themes/bootstrap4-light-purple/theme.css'
// import 'primevue/resources/themes/md-light-deeppurple/theme.css'
// import 'primevue/resources/themes/vela-orange/theme.css'
// import 'primevue/resources/themes/vela-purple/theme.css'
// import 'primevue/resources/themes/arya-blue/theme.css'
// primevue/resources/themes/arya-green/theme.css
// import 'primevue/resources/themes/arya-orange/theme.css'
// import 'primevue/resources/themes/md-dark-deeppurple/theme.css'
// import 'primevue/resources/themes/saga-green/theme.css'
import 'primevue/resources/themes/saga-orange/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'



import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';
import Menubar from 'primevue/menubar';
import Menu from 'primevue/menu';
import Button from 'primevue/button';
import Badge from 'primevue/badge'

import InputText from 'primevue/inputtext'
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';

import BadgeDirective from 'primevue/badgedirective';
import MegaMenu from 'primevue/megamenu';
import Carousel from 'primevue/carousel';
import Checkbox from 'primevue/checkbox'

import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmPopup from 'primevue/confirmpopup';
import ConfirmationService from 'primevue/confirmationservice';

import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';


// const app = createApp(App)
const app = createApp(AppWrapper)


app.use(createPinia())
app.use(router)

app.use(PrimeVue, { ripple: true, inputStyle: 'outlined' });
app.use(ConfirmationService);
app.use(ToastService);



app.directive('badge', BadgeDirective);

app.component('Dialog', Dialog);
app.component('Menubar', Menubar);
app.component('InputText', InputText);
app.component('Avatar', Avatar)
app.component('AvatarGroup', AvatarGroup)
app.component('Menu', Menu)
app.component('Button', Button)
app.component('Badge', Badge)
app.component('MegaMenu', MegaMenu)
app.component('Carousel', Carousel)
app.component('Checkbox', Checkbox)

app.component('Toast', Toast)







app.mount('#app')
