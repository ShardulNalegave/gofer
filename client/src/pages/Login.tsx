
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Image, TextInput, Box, PasswordInput, Title, Text, Button, LoadingOverlay } from '@mantine/core';

import loginScreenBg from '../assets/loginScreenBg.jpg';
import Page from '../components/Page';
import Spacer from '../components/Spacer';
import { loginUser } from '../authUtils';

export default function Login() {
  let [ emailValue, setEmailValue ] = useState('');
  let [ passwordValue, setPasswordValue ] = useState('');
  let [ errorValue, setErrorValue ] = useState(null);
  let [ loginLoading, setLoginLoading ] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async () => {
    setErrorValue(null);
    setLoginLoading(true);
    try {
      await loginUser(emailValue, passwordValue);
      navigate('/dashboard');
    } catch (err: any) {
      setLoginLoading(false);
      setErrorValue(err.message);
    }
  };

  return (
    <Box style={{ maxHeight: '100vh', overflowY: 'hidden' }}>
      <LoadingOverlay visible={loginLoading} />
      <Grid gutter={0} style={{ maxHeight: '100vh', overflowY: 'hidden' }}>
        <Grid.Col span='content'>
          <Page padding={50} scroll={false}>
            <Box style={{ width: '500px' }}>
              <Spacer height={30} />
              <Title style={{ fontSize: '40px' }}>Hey There!</Title>
              <Spacer height={10} />
              <Text className='mono-font'>Login to access your dashboard.</Text>
              <Spacer height={30} />
              <TextInput
                placeholder="Your email"
                label="Email"
                withAsterisk
                value={emailValue}
                onChange={event => {
                  event.preventDefault();
                  setEmailValue(event.currentTarget.value);
                }}
              />
              <Spacer height={25} />
              <PasswordInput
                placeholder="Your password"
                label="Password"
                withAsterisk
                value={passwordValue}
                onChange={event => {
                  event.preventDefault();
                  setPasswordValue(event.currentTarget.value);
                }}
                
              />
              <Spacer height={30} />
              <Button onClick={event => {
                event.preventDefault();
                handleSubmit();
              }}>Login</Button>
              <Spacer height={15} />
              <Text style={{ color: '#E53935' }}>{errorValue}</Text>
            </Box>
          </Page>
        </Grid.Col>
        <Grid.Col span='auto'>
          <Image src={loginScreenBg} style={{ display: 'block', height: '100vh', opacity: '0.8' }} withPlaceholder />
        </Grid.Col>
      </Grid>
    </Box>
  );
}
