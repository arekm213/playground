#import "NativeWebviewView.h"

#import <WebKit/WebKit.h>

#import <react/renderer/components/NativeWebviewViewSpec/ComponentDescriptors.h>
#import <react/renderer/components/NativeWebviewViewSpec/EventEmitters.h>
#import <react/renderer/components/NativeWebviewViewSpec/Props.h>
#import <react/renderer/components/NativeWebviewViewSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface NativeWebviewView () <RCTNativeWebviewViewViewProtocol, WKNavigationDelegate>
@end

@implementation NativeWebviewView {
    WKWebView * _webView;
    NSURL * _sourceURL;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
    return concreteComponentDescriptorProvider<NativeWebviewViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame]) {
        static const auto defaultProps = std::make_shared<const NativeWebviewViewProps>();
        _props = defaultProps;

        _webView = [[WKWebView alloc] init];
        _webView.navigationDelegate = self;

        self.contentView = _webView;
    }

    return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<NativeWebviewViewProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<NativeWebviewViewProps const>(props);

    if (oldViewProps.sourceURL != newViewProps.sourceURL) {
        NSString *urlString = [NSString stringWithUTF8String:newViewProps.sourceURL.c_str()];
        _sourceURL = urlString.length > 0 ? [NSURL URLWithString:urlString] : nil;
        if ([self urlIsValid:newViewProps.sourceURL]) {
            [_webView loadRequest:[NSURLRequest requestWithURL:_sourceURL]];
        }
    }

    [super updateProps:props oldProps:oldProps];
}

#pragma mark - WKNavigationDelegate
- (void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation
{
    NativeWebviewViewEventEmitter::OnScriptLoaded result =
        NativeWebviewViewEventEmitter::OnScriptLoaded{
            NativeWebviewViewEventEmitter::OnScriptLoadedResult::Success};
    self.eventEmitter.onScriptLoaded(result);
}

- (BOOL)urlIsValid:(std::string)propString
{
    if (propString.length() > 0 && !_sourceURL) {
        NativeWebviewViewEventEmitter::OnScriptLoaded result =
            NativeWebviewViewEventEmitter::OnScriptLoaded{
                NativeWebviewViewEventEmitter::OnScriptLoadedResult::Error};
        self.eventEmitter.onScriptLoaded(result);
        return NO;
    }
    return YES;
}

- (const NativeWebviewViewEventEmitter &)eventEmitter
{
    return static_cast<const NativeWebviewViewEventEmitter &>(*_eventEmitter);
}

@end

Class<RCTComponentViewProtocol> NativeWebviewViewCls(void)
{
    return NativeWebviewView.class;
}
