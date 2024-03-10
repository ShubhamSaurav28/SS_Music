import React from 'react'
import { Link } from 'react-router-dom'

export default function BlockedPath() {
  return (
        <div className="hero min-h-screen bg-base-200 absolute top-0 z-50">
    <div className="hero-content text-center">
        <div className="max-w-md">
        <h1 className="text-5xl font-bold">Unauthorized</h1>
        <p className="py-6">Please go the the main page to get the music content</p>
        <Link to='/'>
        <button className="btn btn-primary">Main Page</button>
        </Link>
        </div>
    </div>
    </div>
  )
}
