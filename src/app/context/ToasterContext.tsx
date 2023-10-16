'use client'

import React, { ReactNode } from 'react'
import { Toaster } from "react-hot-toast"
import { signIn, useSession } from "next-auth/react";


const ToasterContext = () => {

    return (
        <div>
            <Toaster />
        </div>
    )
}

export default ToasterContext;