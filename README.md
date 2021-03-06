# Shooper

### Project in progress



Live app: ```https://bxzne.herokuapp.com``` 

Test account <br>```      username: "TestAccount"```<br>
      ```email: "test@test.com"```<br>
      ```password: "Test1234" ```

API documentation: ```https://documenter.getpostman.com/view/13121558/Uyr8kxKX```

### Setup environment

Use below command to install all dependencies:

```$ yarn run install:all```

### Start development

If you are using VSC build in terminal, you can start with ```Shift + cmd + B``` and choose Start Dev.

Otherwise use ```$ yarn start:all```

---

### Commits

Husky will abort every commit with failed test and/or eslint errors.

---

### Styling components

1. Use Css Modules to style components

* Create scss file ${name}.module.scss and import style to component with ```import styles from './${name}.module.scss';```.
* Use imported styles in className: ```<p className={styles.className}></p>```

2. Use global styles

* To use global values like variables & mixins ```@import``` file to ```styles/sass/global.scss```

3. Use global classes

* Import .scss files to ```styles/sass/main.scss```
