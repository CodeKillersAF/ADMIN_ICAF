import React from 'react'
import AdminLoginForm from '../../components/AdminLoginForm/AdminLoginForm'
import backgroundImage from 'url:../../../public/images/loginbackground.jpg'
import './AdminLoginPage.css'

export default function AdminLoginPage() {
    return (
        <div className="adminLoginPage" >
            
            {/* AdminLoginForm */}
            <AdminLoginForm/>
        </div>
    )
}
