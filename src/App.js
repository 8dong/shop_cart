import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cart-actions';
// import uiSlice from './store/ui-slice';

let isInitial = true;

function App() {
  const cartIsVisible = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [dispatch, cart]);

  // useEffect(() => {
  //   const sendCartData = async () => {
  //     dispatch(
  //       uiSlice.actions.setNotification({
  //         status: 'pending',
  //         title: 'Sending...',
  //         message: 'pending cart data!'
  //       })
  //     );

  //     const response = await fetch(
  //       'https://section19-6f56e-default-rtdb.firebaseio.com/cart.json',
  //       {
  //         method: 'PUT',
  //         body: JSON.stringify(cart),
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       }
  //     );

  //     if (!response.ok) {
  //       dispatch(
  //         uiSlice.actions.setNotification({
  //           status: 'error',
  //           title: 'Error!',
  //           message: 'Sending cart data failed!'
  //         })
  //       );
  //     }

  //     dispatch(
  //       uiSlice.actions.setNotification({
  //         status: 'success',
  //         title: 'Success!',
  //         message: 'Sent cart data successfully!'
  //       })
  //     );
  //   };

  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }

  //   sendCartData();
  // }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
