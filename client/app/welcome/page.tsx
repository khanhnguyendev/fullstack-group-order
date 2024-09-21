'use client'
import withAuth from '@/components/withAuth';
import useSignUp from '@/hooks/auth/signUp';
import { MantineProvider, Container, Input, Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useRef, useState } from 'react';

function Welcome() {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [typing, setTyping] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { signUp } = useSignUp()
  
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '' },
    // validate: {
    //   name: (value) => (value.length < 3 ? 'Name đâuuuuuu' : null),
    // },
  });

  const handleChangeInput = (value: string) => {
    setTyping(!!value)
  }
  
  const submitForm = async (values: typeof form.values) => {
    try {
      if(!values || !values.name) {
        setError('Name đâuuuuu')
        throw new Error('Empty field name')
      }
      setChecked(false)
      setSubmitted(true)
      setTimeout(async() => {
        await signUp(values.name)
      }, 2000);
    } catch (error) {
      console.error("Failed to sign up:", error);
    }
  }

  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent): void => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setChecked(false)
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [wrapperRef]);
  
  return (
    <MantineProvider classNamesPrefix="welcome-page">
      <Container fluid >
        <Checkbox
          className={`c-checkbox ${checked ? 'checked':''}`}
          id="checkbox"
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
        />
        <div className="c-formContainer" ref={wrapperRef}>
          <form className={`c-form ${submitted ? 'submitted': ''}`} onSubmit={form.onSubmit(submitForm)}>
            <input 
              className="c-form__input" 
              placeholder="Your name" 
              onKeyUp={(e) => handleChangeInput((e.target as HTMLInputElement).value)}
              key={form.key('name')}
              {...form.getInputProps('name')} 
            />
            <span className='error-message'>{ error }</span>
            <label className="c-form__buttonLabel">
              <button className={`c-form__button ${typing ? 'typing': ''}`} type="submit">Send</button>
            </label>
            <label className="c-form__toggle" htmlFor="checkbox" data-title="Enter Your Name"></label>
          </form>
        </div>
      </Container>

    </MantineProvider>
  );
};


export default withAuth(Welcome)