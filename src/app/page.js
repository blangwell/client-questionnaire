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
    <Container className="pt-3 pb-5">
      <h1 className="text-center my-4">Client Questionnaire</h1>
      <hr/>

      <h2>Tell us about yourself</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="my-2">
          <Form.Label htmlFor="name" className="fw-medium">Name</Form.Label>
          <Form.Control 
            id="name" 
            {...register('name', { required: true })} 
          />
          {errors['name'] && (<p className="text-danger">Please tell us your name</p>)}
        </Form.Group>

        <Form.Group className="my-2">
          <Form.Label htmlFor="email" className="fw-medium">Email</Form.Label>
          <Form.Control 
            type="email" 
            id="email" 
            {...register('email', { required: true })}
          />
          {errors['email'] && (<p className="text-danger">Please enter a valid email address</p>)}
        </Form.Group>
        
        <Form.Group className="my-2">
          <Form.Label htmlFor="cellphone" className="fw-medium me-2">Cell Phone</Form.Label>
          <Form.Text muted className="fst-italic">(Optional)</Form.Text>
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
            <p className="text-danger">Invalid Phone Number</p>
          )}
        </Form.Group>

        <Form.Group className="my-2">
          <Form.Label htmlFor="business-name" className="fw-medium me-2">Business Name</Form.Label>
          <Form.Text muted className="fst-italic">(Optional)</Form.Text>
          <Form.Control 
            id="business-name" 
            {...register('business-name')}
          />
        </Form.Group>

        <Form.Group className="my-2"> 
          <Form.Label htmlFor="web-links" className="fw-medium me-2">Existing Web Links</Form.Label>
          <Form.Text muted className="fst-italic">(Optional)</Form.Text>
          {fields.map((item, index) => (
            <div key={item.id}>
              <InputGroup 
                className="mb-2"
                
              >
                <Form.Control 
                  id={`web-links${index}`}
                  placeholder="Add a URL"
                  {...register(`web-links.${index}`, {pattern: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/g})}
                />
                <Button onClick={() => remove(index)} variant="outline-danger" className="mx-3">Delete</Button>
              </InputGroup>
              {errors?.['web-links']?.[index] && (<p className="text-danger">Must be a valid URL</p>)}
            </div>
          ))}
          <Button onClick={() => append('')} variant="outline-success" className="my-2 d-block">Add Link</Button>
        </Form.Group>
        <hr />


        <h2 className="mt-5">Tell us about your project</h2>
        <Form.Group className="my-3">
          <Form.Label htmlFor="project-summary" className="fw-medium">In a few sentences, give us a summary of what you'd like to build.</Form.Label>          
          <Form.Control 
            id="project-summary"
            as="textarea"
            placeholder="I want to build a website for my..."
            {...register('project-summary', { required: true })}
          />
          {errors['project-summary'] && (<p className="text-danger">Please tell us about your project</p>)}
        </Form.Group>

        <Form.Group className="my-3">
          <Form.Label htmlFor="project-goals" className="fw-medium">What are your goals for this website?</Form.Label>
          <Form.Control 
            id="project-goals"
            placeholder="I want to improve my online presence, publish content, showcase my work..."
            as="textarea"
            {...register('project-goals', { required: true })}
          />
          {errors['project-goals'] && (<p className="text-danger">Please tell us about your goals for this project</p>)}
        </Form.Group>

        <Form.Group className="my-3">
          <Form.Label htmlFor="target-audience" className="fw-medium">Tell us more about your target audience / customer base.</Form.Label>
          <Form.Control
            id="target-audience"
            as="textarea"
            placeholder="My target audience is..."
            {...register('target-audience', { required: true })}
          />
          {errors['target-audience'] && (<p className="text-danger">Please tell us a little about your target audience</p>)}
        </Form.Group>

        <Form.Group className="my-3">
          <Form.Label htmlFor="requested-features" className="fw-medium me-2">Are there any specific features you're looking for?</Form.Label>
          <Form.Text muted className="fst-italic">(Optional)</Form.Text>
          <Form.Control 
            id="requested-features"
            as="textarea"
            placeholder="Image carousels, blog, shopping cart & checkout, user authentication..."
            {...register('requested-features')}
          />
        </Form.Group>
        
        <Form.Group className="my-3">
          <Form.Label htmlFor="existing-content" className="fw-medium me-2">Do you have existing content for your website? If so, tell us more.</Form.Label>
          <Form.Text muted className="fst-italic">(Optional)</Form.Text>
          <Form.Control 
            as="textarea"
            id="existing-content"
            placeholder="Copy, images, logos, product data..."
            {...register('existing-content')}
          />
        </Form.Group>

        <Form.Group className="my-3">
          <Form.Label htmlFor="frequent-updates" className="fw-medium">Will your website need to be updated frequently? If so, what sort of content and how often?</Form.Label>
          <Form.Control 
            id="frequent-updates"
            placeholder="Articles, products, posts..."
            {...register('frequent-updates', { required: true })}
          />
          {errors['frequent-updates'] && (<p className="text-danger">Please let us know about your plans for future updates</p>)}
        </Form.Group>

        <Form.Group className="my-3">
          <Form.Label htmlFor="domain-name" className="fw-medium me-2">What is your ideal domain name?</Form.Label>
          <Form.Text muted className="fst-italic">(Optional)</Form.Text>
          <Form.Control
            id="domain-name"
            placeholder="petespicklepalace.com, comicontables.biz..."
            {...register('domain-name')}
          />
        </Form.Group>

        <h2 className="mt-5">Let's talk aesthetics</h2>
        <Form.Group className="my-3">
          <Form.Label htmlFor="aesthetic" className="fw-medium">In a few words, describe the general aesthetic you want for the website.</Form.Label>
          <Form.Control 
            as="textarea"
            id="aesthetic"
            placeholder="Cute, confident, friendly yet professional..."
            {...register('aesthetic', { required: true })}
          />
          {errors['aesthetic'] && (<p className="text-danger">Please tell us what kind of aesthetic you have in mind</p>)}
        </Form.Group>

        <Form.Group className="my-3">
          <Form.Label htmlFor="style-guide" className="fw-medium">Do you have an existing style guide or any particular styles in mind for the website? If so, tell us more.</Form.Label>
          <Form.Text muted className="fst-italic">(Optional)</Form.Text>
          <Form.Control 
            as="textarea"
            id="style-guide"
            placeholder="Color palettes, fonts..."
            {...register('style-guide')}
          />
        </Form.Group>

        <Form.Group className="my-3">
          <Form.Label htmlFor="inspiration" className="fw-medium">Are there any websites you like and want to draw inspiration from? If so, add a link and tell us a little about what you like.</Form.Label>
          <Form.Text muted className="fst-italic">(Optional)</Form.Text>
          <Form.Control 
            as="textarea"
            id="inspiration"
            placeholder=""
            {...register('inspiration')}
          />
        </Form.Group>

        <h2 className="mt-5">Logistics</h2>
        <Form.Group className="my-3">
          <Form.Label htmlFor="budget" className="fw-medium">What is your approximate budget for this project?</Form.Label>
          <InputGroup>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control 
              id="budget"
              placeholder="0"
              {...register('budget', { required: true })}
            />
          </InputGroup>          
          {errors['budget'] && (<p className="text-danger">Please let us know what your approximate budget is</p>)}
        </Form.Group>

        <Form.Group className="my-3">
          <Form.Label htmlFor="timeline" className="fw-medium">What is your ideal timeline for completion?</Form.Label>
          <Form.Control 
            id="timeline"
            placeholder="One month, six months, whenever..."
            {...register('timeline', { required: true })}
          />
          {errors['timeline'] && (<p className="text-danger">Please let us know what your timeline looks like</p>)}
        </Form.Group>

        <Form.Group className="my-3">
          <Form.Label htmlFor="project-updates" className="fw-medium">How often do you want to receive project updates or hold project meetings?</Form.Label>
          <Form.Control 
            id="project-updates"
            placeholder="Weekly, biweekly, hourly..."
            {...register('project-updates', { required: true })}
          />
          {errors['project-updates'] && (<p className="text-danger">Please let us know how often you'd like to receive updates</p>)}
        </Form.Group>

        <Form.Group className="my-3">
          <Form.Label htmlFor="communication" className="fw-medium">How would you prefer to communicate?</Form.Label>
          <Form.Control 
            id="communication"
            placeholder="Email, text, phone, Asana..."
            {...register('communication', { required: true })}
          />
          {errors['communication'] && (<p className="text-danger">Please let us know how you prefer to communicate</p>)}
        </Form.Group>

        <h2 className="mt-5">Anything Else?</h2>
        <Form.Group className="my-3">
          <Form.Label htmlFor="other" className="fw-medium">Anything else you'd like for us to know before we meet?</Form.Label>
          <Form.Control 
            id="other"
            as="textarea"
            {...register('other')}
          />
        </Form.Group>


        <Button type="submit" className="mt-3">Submit</Button>
        {Object.keys(errors).length > 0 && (<p className="text-danger mt-3">There were some errors with the form</p>)}
      </Form>
    </Container>
  )
}
