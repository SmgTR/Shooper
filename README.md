# Shooper

### Project in progress

ToDo:
Backend- delivery and order process, mail templates.
Frontend- Manage products, manage orders and delivery.

Live app: ```https://bxzne.herokuapp.com``` 

### Setup environment

Use below command to install all dependencies:

```$ yarn run install:all```

### Start develop

If you are using VSC build in terminal, you can start with ```Shift + cmd + B``` and choose Start Dev.

Otherwise use ```$ yarn start:all```

---

### Commits

Husky will abort every commit with test falling and/or eslint errors.

---

### Styling components

1. Use Css Modules to style components

* Create scss file ${name}.module.scss and import style to component with ```import styles from './${name}.module.scss';```.
* Use imported styles in className: ```<p className={styles.className}></p>```

2. Use global styles

* To use global values like variables & mixins ```@import``` file to ```styles/sass/global.scss```

3. Use global classes

* Import .scss files to ```styles/sass/main.scss```
