// import Footer from '@/components/Footer';
import logo from '@/assets/images/logo.svg';
import { login } from '@/services/api/user';
import { encryptPwd } from '@/utils/encryptPwd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { message } from 'antd';
import { history, useModel } from 'umi';
import styles from './index.less';

const Login = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const handleSubmit = async (values) => {
    try {
      // 登录
      const msg = await login({ ...values });

      if (msg.statusCode === 200) {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        const token = msg.data.token;
        const user = {
          name: msg.data.user.name,
          id: msg.data.user.id,
        };
        window.localStorage.setItem('token', token);
        await setInitialState((s) => ({
          ...s,
          token: token,
          user: user,
        }));
        // 获取一下 init 的数据。
        const meta = await initialState?.fetchInitData();
        await setInitialState((s) => ({
          ...s,
          token: token,
          user: user,
          ...meta,
        }));
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query;
        history.push(redirect || '/');
        return;
      }
    } catch (error) {}
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          className={styles.loginForm}
          logo={logo}
          title="lxy-blog"
          subTitle={'lxy-blog 博客管理后台'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            const { username, password } = values;
            await handleSubmit({
              username,
              password: encryptPwd(username, password),
            });
          }}
        >
          {
            <>
              <ProFormText
                name="username"
                autoComplete="off"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'用户名'}
                rules={[
                  {
                    required: true,
                    message: '必填项并且大于等于5个字符！',
                    min: 5, // 最少要输入 5 个字符
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                autoComplete="off"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'密码'}
                rules={[
                  {
                    required: true,
                    message: '必填项并且大于等于5个字符！',
                    min: 5, // 最少要输入 5 个字符
                  },
                ]}
              />
            </>
          }
          <div
            style={{
              marginBottom: 24,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              onClick={() => {
                history.push('/user/restore');
              }}
            >
              忘记密码
            </a>
          </div>
        </LoginForm>
      </div>
      {/*<Footer />*/}
    </div>
  );
};

export default Login;
