import React, {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';

//libs
import {useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';

//hooks
import useDispatch from '@hooks/useDispatch';

//stores
import {setListChampionData} from '@stores/champion/champion.slice';
import {
  selectChampionListOriginal,
  selectChampionListConverted,
  selectChampionLoading,
} from '@stores/champion/champion.selector';
import {getChampionStats} from '@stores/champion/champion.thunk';

const useChampionLogic = () => {
  //hooks
  const dispatch = useDispatch();

  const data = useSelector(selectChampionListOriginal);

  const isLoading = useSelector(selectChampionLoading);

  const championListConverted = useSelector(selectChampionListConverted);

  const inset = useSafeAreaInsets();

  const getData = useCallback(async () => {
    dispatch(getChampionStats(null));
  }, [dispatch]);

  const onDisplayNotification = async () => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  async function onCreateTriggerNotification() {
    const date = new Date(Date.now());
    date.setHours(1);
    date.setMinutes(17);

    // Create a time-based trigger
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
    };

    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        title: 'Meeting with Jane',
        body: 'Today at 11:20am',
        android: {
          channelId: 'your-channel-id',
        },
      },
      trigger,
    );
  }

  //side effect
  useFocusEffect(
    React.useCallback(() => {
      dispatch(setListChampionData([]));
      getData();
    }, []),
  );

  return {
    data,
    inset,
    isLoading,
    championListConverted,
    onDisplayNotification,
    onCreateTriggerNotification,
  };
};

export default useChampionLogic;
