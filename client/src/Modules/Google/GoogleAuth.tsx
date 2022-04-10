import GoogleLogin from 'react-google-login';
import UseGoogleAuthentication from './UseGoogleAuthentication';

function GoogleButton() {
  const clientId = process.env.REACT_APP_GOOGLE_APP;
  const { handleSuccess } = UseGoogleAuthentication();

  return <GoogleLogin clientId={clientId} buttonText="Log in" onSuccess={handleSuccess} />;
}

export default GoogleButton;
