'use client'

import { useForm, Controller, useFieldArray } from 'react-hook-form';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input/input';
import { ErrorMessage } from "@hookform/error-message"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import InputGroup from 'react-bootstrap/InputGroup'
import 'bootstrap/dist/css/bootstrap.css'

export default function Home() {
  const { 
    register, 
    handleSubmit, 
    watch, 
    control, 
    formState: {errors} 
  } = useForm({
    defaultValues: {
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'web-links'
  });

  const onSubmit = data => console.log(data);

  console.log(watch());

  return (
    <Container>
      <h1 className="text-center my-4">Client Questionnaire</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control 
            id="name" 
            {...register('name', { required: true })} 
          />
          <Form.Text muted>*required</Form.Text>
          {errors['name'] && (<p className="text-danger">Please tell us your name</p>)}
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control 
            type="email" 
            id="email" 
            {...register('email', { required: true })}
          />
          <Form.Text muted>*required</Form.Text>
          {errors['email'] && (<p className="text-danger">Please enter a valid email</p>)}
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="cellphone">Cell Phone</Form.Label>
          <Controller
            control={control}
            name="cellphone"
            id="cellphone"
            rules={{ validate: (value) => value && isValidPhoneNumber(value) }}
            render={({ field: { ref, ...field } }) => (
              <PhoneInput
                {...field}
                className="form-control"
                country="US"
                id="cellphone"
              />
            )}
          />
          {errors["cellphone"] && (
            <p className="text-danger">Invalid Phone</p>
          )}
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="business-name">Business Name</Form.Label>
          <Form.Control 
            id="business-name" 
            {...register('business-name')}
          />
        </Form.Group>
        <Form.Group> 
          <Form.Label>Existing Web Links</Form.Label>
          {fields.map((item, index) => (
            <div key={item.id}>
              <InputGroup 
                className="mb-2"
                
              >
                <Form.Control 
                  id={`web-links${index}`}
                  placeholder="Add a URL"
                  {...register(`web-links.${index}`, {pattern: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/g})}
                ></Form.Control>
                <Button onClick={() => remove(index)} className="mx-3 btn-secondary">Delete</Button>
              </InputGroup>
              {errors?.['web-links']?.[index] && (<p className="text-danger">Must be a valid URL</p>)}
            </div>
          ))}
          <Button onClick={() => append('')} className="btn-success d-block">Add Link to Web Presence</Button>
        </Form.Group>
        <Button type="submit" className="mt-3">Submit</Button>
        {Object.keys(errors).length > 0 && (<p className="text-danger">There were some errors with the form</p>)}
      </Form>
    </Container>
  )
}
