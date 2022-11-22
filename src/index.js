import { render } from 'preact'
import { Suspense } from 'preact/compat'
import HomePage from './pages/home'

render(
    <Suspense fallback={null}>
        <HomePage />
    </Suspense>,
    document.getElementById('app')
)
