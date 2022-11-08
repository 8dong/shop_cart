import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';

export const fetchCartData = () => {
  return async dispatch => {
    const fetchData = async () => {
      const response = await fetch('https://section19-6f56e-default-rtdb.firebaseio.com/cart.json');

      if (!response.ok) {
        throw new Error('fetch failed!');
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();

      dispatch(cartActions.replaceCart(cartData));
    } catch (error) {
      dispatch(
        uiActions.setNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending Cart data failed!'
        })
      );
    }
  };
};

export const sendCartData = cart => {
  return async dispatch => {
    dispatch(
      uiActions.setNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending Cart data!'
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        'https://section19-6f56e-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
          'Content-Type': 'application/json'
        }
      );

      if (!response.ok) {
        throw new Error('Send Cart Data failed!');
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.setNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent Cart data successfully!'
        })
      );
    } catch (error) {
      dispatch(
        uiActions.setNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending Cart data failed!'
        })
      );
    }
  };
};
