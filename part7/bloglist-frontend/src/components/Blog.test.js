import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

const blog = {
    title: 'Blog especially for testing',
    author: 'Wojciech',
    url: 'www.wojciech.com',
    likes: 1
}

// describe('Basic component render with 3 methods', () => {


// test('renders the content of blog - method 1', () => {
    
    
//     const component = render(
//         <Blog blog={blog}/>
//     )
    
//     expect(component.container).toHaveTextContent(
//         'Blog especially for testing by Wojciech'
//     )
// })

// test('renders the content of blog - method 2', () => {

//     const component = render(
//         <Blog blog={blog}/>
//     )

//     const element = component.getByText(
//         'Blog especially for testing by Wojciech'
//     )
//     expect(element).toBeDefined()
// })

// test('renders the content of blog - method 3', () => {

//     const component = render(
//         <Blog blog={blog}/>
//     )

//     const div = component.container.querySelector('.blogStyle')
//     expect(div).toHaveTextContent(
//         'Blog especially for testing by Wojciech'
//     )
// })
// })

// describe('Will the details be shown?', () => {
//     let component

//     beforeEach(() => {
//         component = render(
//             <Blog blog={blog}/>
//         )
//     })

//     test('render the blog component with default view at start', () => {
//         const div = component.container.querySelector('.showDetails')
//         expect(div).toHaveTextContent('view')
//     })

//     test('render the blog component with details not be defined', () => {
//         const div = component.container.querySelector('.detailedView')
//         expect(div).toBeNull()
//     })

//     test('after clicking a button, details are displayed', () => {

//         const button = component.getByText('view')
//         fireEvent.click(button)

//         const div = component.container.querySelector('.detailedView')
//         expect(div).toBeDefined()
//     })
// })

// describe('calling like event handler twice', () => {

//     test('hitting that like button twice', () => {

//         const mockHandler = jest.fn()

//         const component = render(
//             <Blog blog={blog} handleLikeUpdate={mockHandler}/>
//         )

//         const button = component.getByText('view')
//         fireEvent.click(button)

//         const div = component.container.querySelector('.detailedView')
//         expect(div).toBeDefined()

//         const likeButton = div.querySelector('.likeBtn')
//         fireEvent.click(likeButton)
//         fireEvent.click(likeButton)

//         expect(mockHandler.mock.calls).toHaveLength(2)
        
//     })
// })

describe('form tests', () => {
    test('BlogForm updates the parent state and calls onSubmit', () => {
        const createBlog = jest.fn()

        const component = render(<BlogForm createBlog={createBlog}/>)
        const title = component.container.querySelector('#title')
        const author = component.container.querySelector('#author')
        const url = component.container.querySelector('#url')

        const form = component.container.querySelector('form')

        const initialBlog = {
            title: 'I hope this works',
            author: 'Wojt',
            url: 'www.wojt.pl'
        }

        fireEvent.change(title, {
            target: { value: 'I hope this works'}
        })

        fireEvent.change(author, {
            target: { value: 'Wojt'}
        })

        fireEvent.change(url, {
            target: { value: 'www.wojt.pl'}
        })

        fireEvent.submit(form)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0]).toEqual(initialBlog)

    })
})





