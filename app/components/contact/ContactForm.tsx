'use client'

import axios from 'axios'
import { FormData } from 'pages/api/contact'
import React, { useState } from 'react'

import ContentLink from '../common/ContentLink'

type SentStatus = 'sent' | 'idle'

interface Props {
  showIntro?: boolean
}

const ContactForm = ({ showIntro = false }: Props) => {
  const [error, setError] = useState('')
  const [sentStatus, setSentStatus] = useState<SentStatus>('idle')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })

  function renderThankYouSection() {
    return (
      <div className="bg-teal-800 py-4 px-2 mt-8">
        <h2 className="text-xl font-extrabold text-white sm:text-2xl animate-pulse">
          Thank you!
        </h2>

        <p className="mt-2">
          I&apos;ve received your message, and will come back soon with the
          response.{' '}
        </p>
      </div>
    )
  }

  function renderForm() {
    return (
      <>
        {showIntro && (
          <>
            <p className="mt-8">
              Have questions, looking to collaborate, or just want to say hello?
              👋✨{' '}
            </p>
            <p className="mt-2">
              I&apos;m here for it all! Sending a message is as easy as hitting
              the <span className="font-bold">Send</span> button.
            </p>
          </>
        )}
        <div className="w-full max-w-md mt-2">
          <form
            name="contact-form"
            className="bg-emerald-900 p-4 rounded-md"
            method="post"
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit(formData)
            }}
          >
            <div className="mb-4">
              <label className={formGroupStyle}>
                <span className={labelStyle}>Your Name:</span>
                <input
                  className={inputStyle}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input type="hidden" name="form-name" value="contact" />
              </label>
            </div>
            <div className="mb-4">
              <label className={formGroupStyle}>
                <span className={labelStyle}>Your Email:</span>
                <input
                  className={inputStyle}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="mb-4">
              <label className={formGroupStyle}>
                <span className={labelStyle}>Message:</span>
                <textarea
                  className={inputStyle}
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
              </label>
            </div>
            <div className="mb-4">
              <button
                className="bg-yellow-300 hover:bg-yellow-400 focus:bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded hover:transition-all duration-150"
                type="submit"
              >
                Send
              </button>
            </div>
            {error.length > 0 && (
              <div className="my-2 p-4 rounded-md bg-red-300 border-red-400 border">
                {error}
              </div>
            )}
          </form>
        </div>

        <p className="mt-2">
          Connect with me on{' '}
          <ContentLink
            url="https://www.linkedin.com/in/mares-popa/"
            title="Mares Popa LinkedIN"
            label="LinkedIn"
            isExternal={true}
            target="_blank"
          />{' '}
          if you prefer a more casual introduction.
        </p>
      </>
    )
  }

  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })

    return response
  }

  async function handleSubmit(formData: FormData) {
    try {
      await postData('/api/contact', formData)
      setSentStatus('sent')
    } catch (error) {
      setError(`${error}`)
    }
  }

  return (
    <div className="max-w-prose leading-relaxed text-gray-200">
      {sentStatus === 'idle' && renderForm()}
      {sentStatus === 'sent' && renderThankYouSection()}
    </div>
  )
}

const labelStyle = ''
const inputStyle =
  'text-gray-700 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
const formGroupStyle =
  'flex flex-col gap-2 text-sm font-bold mb-2 first:mt-0 mt-2'

export default ContactForm
