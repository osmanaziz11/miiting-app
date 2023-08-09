import * as Locales from "../Locales";
import * as RNLocalize from "react-native-localize";

class I18n {

  /**
  * Returns the translated key based on current locale
  * @param {string} key - The translation key
  * @return {string} The resulting translation
  */
  static translate(key){
    let currentLocale = this.getCurrentLocale();
    if(!Locales[currentLocale].hasOwnProperty(key)){
      return `[Missing translation: "${key}"]`
    }
    return Locales[currentLocale][key];
  }

  /**
  * Returns the current user preferred locale if available in app locales,
  * otherwise returns the default locale as defined in Locales/index.js
  * @return {string} The preferred locale to use
  */
  static getPreferredLocale(){
    let userPreferredLocales = RNLocalize.getLocales();
    for (var locale of userPreferredLocales){
      if(Locales.hasOwnProperty(locale.languageCode)){
        return locale.languageCode;
      }
    }
    return this.getDefaultLocale();
  }

  /**
  * Returns the default Locale as defined in Locales/index.js,
  * @return {string} The default locale
  */
  static getDefaultLocale(){
    return Locales.defaultLocale;
  }

  /**
  * Selects a string from the given object based on current locale
  * @param {Object} haystack - The object to search in
  * @return {string} The resulting string or null
  */
  static select(haystack){
    let currentLocale = this.getCurrentLocale();
    if(haystack.hasOwnProperty(currentLocale)){
      return haystack[currentLocale]
    }
    return `[Missing translation: "haystack-${currentLocale}"]`;
  }

  /**
  * Returns the currently used locale
  * @return {string} The resulting locale
  */
  static getCurrentLocale(){
    return (this.locale ? this.locale : this.getPreferredLocale())
  }
}


// Aliases
I18n.t = I18n.translate;
I18n.s = I18n.select;

export default I18n;
