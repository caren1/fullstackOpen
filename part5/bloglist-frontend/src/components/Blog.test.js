import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

const blog = {
    title: 'Blog especially for testing',
    author: 'Wojciech',
    url: 'www.wojciech.com',
    likes: 1
}


test('renders the content of blog - method 1', () => {
    
    
    const component = render(
        <Blog blog={blog}/>
    )
    
    expect(component.container).toHaveTextContent(
        'Blog especially for testing by Wojciech'
    )
})

test('renders the content of blog - method 2', () => {

    const component = render(
        <Blog blog={blog}/>
    )

    const element = component.getByText(
        'Blog especially for testing by Wojciech'
    )
    expect(element).toBeDefined()
})

test('renders the content of blog - method 3', () => {

    const component = render(
        <Blog blog={blog}/>
    )

    const div = component.container.querySelector('.blogStyle')
    expect(div).toHaveTextContent(
        'Blog especially for testing by Wojciech'
    )
})






