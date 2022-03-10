import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
        <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="text-muted">Copyright &copy; Your Website 2021</div>
                        </div>
                    </div>
                </footer>
    </>
  )
}

export default Footer