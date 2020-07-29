import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
    title: 'Blog especially for testing',
    author: 'Wojciech',
    url: 'www.wojciech.com',
    likes: 1
}

describe('Basic component render with 3 methods', () => {


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
})

describe('Will the details be shown?', () => {
    let component

    beforeEach(() => {
        component = render(
            <Blog blog={blog}/>
        )
    })

    test('render the blog component with default view at start', () => {
        const div = component.container.querySelector('.showDetails')
        expect(div).toHaveTextContent('view')
    })

    test('render the blog component with details not be defined', () => {
        const div = component.container.querySelector('.detailedView')
        expect(div).toBeNull()
    })

    test('after clicking a button, details are displayed', () => {

        const button = component.getByText('view')
        fireEvent.click(button)

        const div = component.container.querySelector('.detailedView')
        expect(div).toBeDefined()
    })
})






