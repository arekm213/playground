//
//  NativeAppearance.m
//  nativemodulesplayground
//
//  Created by Arek Mrowczyk on 13/05/2026.
//

#import "NativeAppearance.h"
#import <UIKit/UIKit.h>

@implementation NativeAppearance

- (instancetype)init {
  if (self = [super init]) {
    if (@available(iOS 17.0, *)) {
      dispatch_async(dispatch_get_main_queue(), ^{
        UIWindowScene *scene = (UIWindowScene *)UIApplication.sharedApplication.connectedScenes.anyObject;
        if ([scene isKindOfClass:UIWindowScene.class]) {
          [scene registerForTraitChanges:@[UITraitUserInterfaceStyle.class]
                             withHandler:^(id<UITraitEnvironment> env, UITraitCollection *prev) {
            UIUserInterfaceStyle current = env.traitCollection.userInterfaceStyle;
            if (current != prev.userInterfaceStyle && self->_eventEmitterCallback) {
              [self emitOnSchemeChange:@{@"key": @"theme", @"value": current == UIUserInterfaceStyleDark ? @"dark" : @"light"}];
            }
          }];
        }
      });
    }
  }
  return self;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeAppearanceSpecJSI>(params);
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

+ (NSString *)moduleName
{
  return @"NativeAppearance";
}

@end
