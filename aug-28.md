# Questions to clarify

- What is the purpose of this work? What for do you want to turn site into PWA and RNA ?
- What benefits, you expect, it will give to your product?
- How must the final result look like (concerning the website and app functional)?

# Goals overview
As I've understood, you want to take ready website and turn it into a mobile app with no need to support your previous app. This app fully clones the website functions. 
Also, seems like you need to have an app that is able to send notifications for some of your users about actions they consider important, such as order status changes and so on.
You don't need to integrate old mobile app with the current website.

Is this a correct description of this work's goals ? If not or not fully, we need to know what they exactly are. 

# Integration test results
I've created small React Native App (RNA) and tested its integration capabilities with PWA to find out how fully can be goals, described previously, reached.
Unfortunately, there are some barriers that won't allow to do all the stuff.

- ### PWA Cache problem
RNA with PWA included into it won't launch if user's device has no internet - unlike if you launch in a browser with no internet. App will simply show that unable to connect, because web caches doesn't work properly in ReactNative WebView.

#### Possible solution
To manage this problem we will have to create own caches system on React Native App level. It will store cached sources into app's storage, but it is not out-of-box solution and will take time to create. 

- ### Push notifications
ServiceWorkers inside RNA's WebView has no PushManagers. It means that we can't use common WebPush protocol to establish push notifications functional for mobile app.

#### Possible solution
We can connect with 3-d party services such as PubNub or OneSignal. This will make developers create one more backend service on your website to split browser subscriptions and mobile subscriptions and can make backend development rather harder. 
Also, it will require testing on different devices, and write our own React Native level handler in app to display notifications - there is no out-of-box solutions.

- ### Another issues
- PWA + RNA testing requires website to be placed on remote hosting with SSL certificate.
- Several browser services such as geolocation can be unavailable in web app that is included in RNA, so we will have to write RNA-level code to make app work properly.