'use client'
import Link from 'next/link';
import React from 'react'

const ViewDetailUser = ({ params }: { params: { id: string } }) => {

    return (
        <div >
            <div style={{ textAlign: "right" }}>
                <Link href={"/UserList"}>
                    Go back
                </Link>
            </div>
        </div>
    )


}

export default ViewDetailUser