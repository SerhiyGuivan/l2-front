<template>
  <div class="register">
    <Form
      :resolver
      @submit="onFormSubmit"
      class="register__form">
      <FormField
        v-slot="$field"
        name="username"
        class="register__form-field">
        <InputText
          type="text"
          placeholder="Имя пользователя"
          fluid/>
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple">{{ $field.error?.message }}</Message>
      </FormField>
      <FormField
        v-slot="$field"
        name="email"
        class="register__form-field">
        <InputText
          type="text"
          placeholder="Email"
          fluid/>
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple">{{ $field.error?.message }}</Message>
      </FormField>

      <FormField
        v-slot="$field"
        name="password"
        class="register__form-field">
        <Password
          type="text"
          placeholder="Пароль"
          :feedback="false"
          toggleMask
          fluid/>
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
      </FormField>
      <div class="register__actions">
        <Button type="submit" :severity="'secondary'" label="Создать аккаунт" fluid/>
      </div>
      <div class="register__links">
        <NuxtLink to="/login" class="link">Войти</NuxtLink>
      </div>
    </Form>
  </div>
</template>

<script lang="js" setup>
import { useToast } from 'primevue/usetoast';
const router = useRouter()
const { register } = useStrapiAuth();

const toast = useToast();

const resolver = ({ values }) => {
  const errors = { username: [], email: [], password: [] };

  // Проверка: имя пользователя обязательно
  if (!values.username) {
    errors.username.push({ type: 'required', message: 'Имя пользователя обязательно.' });
  }

  // Проверка: минимальная длина имени пользователя — 3 символа
  if (values.username?.length < 3) {
    errors.username.push({ type: 'minimum', message: 'Имя пользователя должно содержать минимум 3 символа.' });
  }

  // Проверка: email обязателен
  if (!values.email) {
    errors.email.push({ type: 'required', message: 'Email обязателен.' });
  } else {
    // Проверка: формат email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      errors.email.push({ type: 'format', message: 'Некорректный формат email.' });
    }
  }

  // Проверка: пароль обязателен
  if (!values.password) {
    errors.password.push({ type: 'required', message: 'Пароль обязателен.' });
  }

  // Проверка: минимальная длина пароля — 6 символов
  if (values.password?.length < 6) {
    errors.password.push({ type: 'minimum', message: 'Пароль должен содержать минимум 6 символов.' });
  }

  return {
    values,
    errors
  };
};


const onFormSubmit = async ({valid, values}) => {
  if (!valid) {
    toast.add({ severity: 'error', summary: 'Form is no valid.', life: 3000 });
    return
  }
  try {
    await register(values);
    router.push('/');

  } catch (e) {
    toast.add({ severity: 'error', summary: e.error.message, life: 3000 });
  }
}
</script>

<style scoped>
.register {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
}
.register__form {
  max-width: 320px;
  flex: 1 1 auto;
}
.register__form-field {
  margin-bottom: 15px;
}
.register__actions {
  margin-bottom: 15px;
}
.register__links {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>