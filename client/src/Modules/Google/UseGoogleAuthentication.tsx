import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import { gql, useMutation } from '@apollo/client';

const UseGoogleAuthentication = () => {
  const SEND_TOKEN = gql`
    mutation GoogleAuth($token: String!) {
      googleAuth(token: $token)
    }
  `;
  const [googleAuth, { data, loading, error }] = useMutation(SEND_TOKEN);

  const handleSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ('accessToken' in response) {
      const accessToken = response.accessToken;

      googleAuth({ variables: { token: accessToken } });

      //     fetch(`${process.env.REACT_APP_GOOGLE_APP_API_URL}/google-authentication`, {
      //       method: 'POST',
      //       body: JSON.stringify({
      //         token: accessToken
      //       }),
      //       headers: {
      //         'Content-Type': 'application/json'
      //       }
      //     });
    }
  };

  return {
    handleSuccess
  };
};

export default UseGoogleAuthentication;
