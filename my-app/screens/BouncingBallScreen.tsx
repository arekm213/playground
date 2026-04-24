import { useHeaderHeight } from '@react-navigation/elements';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedReaction, useAnimatedStyle, useSharedValue, withDecay, withDelay, withTiming } from 'react-native-reanimated';
import { BottomTabs } from 'react-native-screens';

const BALL_SIZE = 80;

enum Direction {
  'left', 'right', 'top', 'bottom'
}

type PossiblyBounceProps = {
  distance: number;
  xTranslation: number;
  yTranslation: number;
}

type PossiblyBounceObj = {
  top?: PossiblyBounceProps;
  left?: PossiblyBounceProps;
  right?: PossiblyBounceProps;
  bottom?: PossiblyBounceProps;
}

export default function BouncingBallScreen() {
  const {width, height} = useWindowDimensions();
  const headerHeight = useHeaderHeight();
  const isPressed = useSharedValue(false);
  const posX = useSharedValue(0);
  const posY = useSharedValue(0);
  


  useAnimatedReaction(
    () => {
      return posX.value;
    },
    (currentValue, previousValue) => {
      if(!posX._animation){
        return;
      }
      if (currentValue >= width - BALL_SIZE) {
        posX._animation.velocity = -Math.abs(posX._animation.velocity)
      }
      if (currentValue <= 0){
        posX._animation.velocity = Math.abs(posX._animation.velocity)
      }
    },
    [width]
  );

  useAnimatedReaction(
    () => {
      return posY.value;
    },
    (currentValue, previousValue) => {
      if(!posX._animation){
        return;
      }
      if (currentValue >= height - BALL_SIZE - headerHeight) {
        posY._animation.velocity = -Math.abs(posY._animation.velocity)
      }
      if (currentValue <= 0){
        posY._animation.velocity = Math.abs(posY._animation.velocity)
      }
    },
    [height, headerHeight]
  );

  const pan = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })

    .onChange((event) => {
      posX.value += event.changeX;
      posY.value += event.changeY;
    })
    .onEnd((event)=> {
      // const velX = event.velocityX;
      // const velY = event.velocityY;
    })
    .onFinalize((event) => {
      // let startX = event.absoluteX;
      // let startY = event.absoluteY;
      let velX = event.velocityX;
      let velY = event.velocityY;

      posX.value = withDecay({velocity: velX});
      posY.value = withDecay({velocity: velY});




      // const getDistance = (x:number, y:number) => {
      //   return Math.sqrt(Math.pow(x,2) + Math.pow(y,2)) 
      // }

      // type GetNextBounceReturnType = {
      //   endX: number;
      //   endY: number;
      //   distance: number;
      //   finishVelX: number;
      //   finishVelY: number;
      // }

      // const getNextBounce = (startX: number, startY: number, velX: number, velY:number): GetNextBounceReturnType => {
      //   const possiblyBounceObj: PossiblyBounceObj = {
      //     top: undefined, 
      //     left: undefined, 
      //     right: undefined, 
      //     bottom: undefined
      //   }

      //   if(velX > 0 && startX + velX > width){
      //     const xTranslation = width - startX;
      //     const yTranslation = velY * xTranslation / velX;
      //     const distance = getDistance(xTranslation, yTranslation);
      //     possiblyBounceObj.right = {
      //       distance,
      //       xTranslation,
      //       yTranslation,
      //     }
      //   }

      //   if(velX < 0 && startX + velX < 0){
      //     const xTranslation = 0 - startX;
      //     const yTranslation = velY * xTranslation / velX;
      //     const distance = getDistance(xTranslation, yTranslation);
      //     possiblyBounceObj.left = {
      //       distance,
      //       xTranslation,
      //       yTranslation,
      //     }
      //   }

      //   if(velY > 0 && startY + velY > height){
      //     const yTranslation = height - startY;
      //     const xTranslation = velX * yTranslation / velY;
      //     const distance = getDistance(xTranslation, yTranslation);
      //     possiblyBounceObj.bottom = {
      //       distance,
      //       xTranslation,
      //       yTranslation,
      //     }
      //   }

      //   if(velY < 0 && startY + velY < 0){
      //     const yTranslation = 0 - startY;
      //     const xTranslation = velX * yTranslation / velY;
      //     const distance = getDistance(xTranslation, yTranslation);
      //     possiblyBounceObj.top = {
      //       distance,
      //       xTranslation,
      //       yTranslation,
      //     }
      //   }

      //   type ShortestDistanceToWallObj = {
      //     direction: string;
      //     distance: number;
      //   }

      //   let shortestDistanceToWallObj: ShortestDistanceToWallObj | undefined = undefined;
      //   for (const [key, value] of Object.entries(possiblyBounceObj)) {
      //     if(value && value.distance){
      //       if(!shortestDistanceToWallObj){
      //         shortestDistanceToWallObj = {
      //           direction: key,
      //           distance: value.distance
      //         }
      //       } else if(shortestDistanceToWallObj.distance > value.distance) {
      //         shortestDistanceToWallObj = {
      //           direction: key,
      //           distance: value.distance
      //         }
      //       }
            
      //     }
      //   }

      //   if(!shortestDistanceToWallObj){
      //     return {
      //       endX: startX + velX,
      //       endY: startY + velY,
      //       distance: getDistance(velX, velY),
      //       finishVelX: 0,
      //       finishVelY: 0,
      //     }
      //   } else {
      //     const bounceDirection = shortestDistanceToWallObj.direction;
      //     const {distance, xTranslation, yTranslation} = possiblyBounceObj[bounceDirection];
      //     const bouncedVertically = bounceDirection === 'left' || bounceDirection === 'right'
      //     return {
      //       endX: startX + xTranslation,
      //       endY: startY + yTranslation,
      //       distance: distance,
      //       finishVelX: bouncedVertically ? -1 : 1 * (velX - xTranslation),
      //       finishVelY: bouncedVertically ? 1 : -1 * (velY - yTranslation),
      //     }
      //   }


      // }

      // const animationsArray = [];
      
      // const { endX, endY, distance, finishVelX, finishVelY } = getNextBounce(startX, startY, velX, velY);
      // let timePassedSoFar = 0;
      // while(velX !== 0 && velY !==0){

      //   const { endX, endY, distance, finishVelX, finishVelY } = getNextBounce(startX, startY, velX, velY);
      //   // animationsArray.push()
      //   startX = endX;
      //   startY = endY;
      //   velX = finishVelX;
      //   velY = finishVelY;
      // }

      





      // let willHitXBorder, willHitYBorder
      // if(startX + velX > width){
      //   willHitXBorder = true;
      // }
      // if(startX + velX < 0) {
      //   willHitXBorder = true;
      // }
      // if(startY + velY > height){
      //   willHitYBorder = true;
      // }
      // if(startY + velY < 0){
      //   willHitYBorder = true;
      // }

      // if(willHitXBorder && willHitYBorder){
      //   if (startX + velX > width){

      //   }
      //   // Need to figure out which one will be hit first
        
      // }

      // posY.value = withDecay({
      //   velocity: event.velocityY,
      //   rubberBandEffect: true,
      //   clamp: [
      //     0,
      //     height,
      //   ],
      // });

      isPressed.value = false;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: isPressed.value ? 'green' : 'red',
    position: 'absolute',
    top: posY.value,
    left: posX.value,
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.ball, animatedStyle]} />
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ball: {
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
  },
});
