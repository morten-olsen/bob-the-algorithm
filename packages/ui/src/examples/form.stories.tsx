import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { FormLayout, Group, TextInput, Button, Checkbox, Row, Horizontal, Selector } from '..';

const countries = new Array(100).fill(0).map((_, i) => ({
  id: i,
  name: `Country ${i}`,
}));

export const Login = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(false);

  return (
    <FormLayout title="Login">
      <TextInput
        icon="user"
        label="Username"
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        label="Password"
        icon="lock"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
      />
      <Checkbox
        label="Remember me"
        value={remember}
        onChangeValue={setRemember}
      />
      <Row>
        <Button title="Login" />
      </Row>
      <Row>
        <Button title="Forgot password" type="secondary" />
      </Row>
    </FormLayout>
  )
}

export const Signup = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordRepeat, setPasswordRepeat] = React.useState('');
  const [country, setCountry] = React.useState<typeof countries[0]>();

  return (
    <FormLayout title="Signup">
      <TextInput
        icon="user"
        label="Username"
        type="username"
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        label="Password"
        icon="lock"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        label="Repeat password"
        icon="lock"
        type="password"
        placeholder="Repeat your password"
        value={passwordRepeat}
        onChangeText={setPasswordRepeat}
      />
      <Group title="Address">
        <TextInput
          label="Street"
          placeholder="Nowhere st. 1"
          type="streetAddressLine1"
          value={username}
          onChangeText={setUsername}
        />
        <Horizontal>
          <TextInput
            label="Zip code"
            placeholder="12345"
            type="postalCode"
            flex={1}
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            label="City"
            type="addressCity"
            flex={1}
            placeholder="Nowhere"
            value={username}
            onChangeText={setUsername}
          />
        </Horizontal>
        <Selector
          label="Country"
          items={countries}
          getId={item => item.id.toString()}
          render={item => ({ title: item.name })}
          selected={country}
          onChangeSelected={setCountry}
        />
      </Group>
      <Checkbox
        label="Sign up for the newsletter"
      />
      <Row>
        <Button title="Login" />
      </Row>
    </FormLayout>
  )
}

export default {
  title: 'Examples/Forms',
  component: Login,
} as ComponentMeta<typeof Login>;


