import React from 'react'

function Footer() {

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12 text-center fadeIn" style={{ animationDelay: "2.2s" }}>
                    <footer className="text-center text-muted font-weight-light">
                        <span style={{ fontSize: "12px" }} >
                            Data provider <a href="https://api.covid19india.org/" target="_blank" rel="noopener noreferrer">COVID19-India API</a>&nbsp;&nbsp;|&nbsp;
                            Created by <a href="https://github.com/shyamsundar055" target="_blank" rel="noopener noreferrer">Shyam Sundar</a>
                        </span>
                    </footer>
                </div>
            </div>
        </div>

    )
}

export default Footer;