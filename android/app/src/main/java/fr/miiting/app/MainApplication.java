package fr.miiting.app;

import android.app.Application;
import android.support.multidex.MultiDexApplication;

import com.facebook.react.ReactApplication;
import cl.json.RNSharePackage;
import com.reactcommunity.rnlocalize.RNLocalizePackage;
import com.beefe.picker.PickerViewPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.horcrux.svg.SvgPackage;
import org.reactnative.camera.RNCameraPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.entria.views.RNViewOverflowPackage;
import com.magus.fblogin.FacebookLoginPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.reactnative.photoview.PhotoViewPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.wix.autogrowtextinput.AutoGrowTextInputPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends MultiDexApplication implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNSharePackage(),
            new RNLocalizePackage(),
            new PickerViewPackage(),
            new ReactVideoPackage(),
            new RNFetchBlobPackage(),
            new PickerPackage(),
            new SvgPackage(),
            new RNCameraPackage(),
            new RNFirebasePackage(),
            new RNViewOverflowPackage(),
            new FacebookLoginPackage(),
            new ReactVideoPackage(),
            new PhotoViewPackage(),
            new VectorIconsPackage(),
            new AutoGrowTextInputPackage(),
            new SplashScreenReactPackage(),
            new LinearGradientPackage(),
            new RNFirebaseNotificationsPackage(),
            new RNFirebaseMessagingPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    FacebookSdk.sdkInitialize(getApplicationContext());
    AppEventsLogger.activateApp(this);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
