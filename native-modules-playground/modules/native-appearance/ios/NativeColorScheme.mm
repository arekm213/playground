//
//  NativeColorScheme.mm
//  nativemodulesplayground
//
//  Created by Arek Mrowczyk on 13/05/2026.
//

#import "NativeColorScheme.h"
#import <UIKit/UIKit.h>

@implementation NativeColorScheme

RCT_EXPORT_MODULE(ColorScheme)

- (instancetype)init {
  if (self = [super init]) {
    if (@available(iOS 17.0, *)) {
      __weak __typeof(self) weakSelf = self;
      dispatch_async(dispatch_get_main_queue(), ^{
        UIWindowScene *scene = (UIWindowScene *)UIApplication.sharedApplication.connectedScenes.anyObject;
        if ([scene isKindOfClass:UIWindowScene.class]) {
          [scene registerForTraitChanges:@[UITraitUserInterfaceStyle.class]
                             withHandler:^(id<UITraitEnvironment> env, UITraitCollection *prev) {
            __strong __typeof(weakSelf) strongSelf = weakSelf;
            if (!strongSelf || !strongSelf->_eventEmitterCallback) return;
            UIUserInterfaceStyle current = env.traitCollection.userInterfaceStyle;
            if (current == prev.userInterfaceStyle) return;
            [strongSelf emitOnSchemeChange:@{@"key": @"theme", @"value": current == UIUserInterfaceStyleDark ? @"dark" : @"light"}];
          }];
        }
      });
    }
  }
  return self;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeColorSchemeSpecJSI>(params);
}

- (NSString * _Nullable)getColorScheme {
  UIUserInterfaceStyle style = UIScreen.mainScreen.traitCollection.userInterfaceStyle;
  switch (style) {
    case UIUserInterfaceStyleDark:
      return @"dark";
    case UIUserInterfaceStyleLight:
      return @"light";
    default:
      return nil;
  }
}

@end
