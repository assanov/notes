import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import NewNote from './components/NewNote';
import { useLocalStorage } from './hooks/UseLocalStorage';
import { useMemo } from 'react';
import { v4 } from 'uuid';

export interface Tag {
    id: string;
    label: string;
}

export interface NoteData {
    title: string;
    markdown: string;
    tags: Tag[];
}

export interface Note extends NoteData {
    id: string;
}

export interface RawNoteData {
    title: string;
    markdown: string;
    tagIds: string[];
}

export interface RawNote extends RawNoteData {
    id: string;
}

function App() {
    const [notes, setNotes] = useLocalStorage<RawNote[]>('notes', []);
    const [tags, setTags] = useLocalStorage<Tag[]>('tags', []);

    const noteWithTags = useMemo(() => {
        return notes.map((note) => ({
            ...note,
            tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
        }));
    }, [notes, tags]);

    function onCreateNote({ tags, ...data }: NoteData) {
        setNotes((prev) => [
            ...prev,
            { id: v4(), tagIds: tags.map((tag) => tag.id), ...data },
        ]);
    }

    function onAddTag(tag: Tag) {
        setTags((prev) => [...prev, tag]);
    }

    return (
        <Container className='my-4'>
            <Routes>
                <Route path='/' element={<h1>Home</h1>} />
                <Route
                    path='/new'
                    element={
                        <NewNote
                            onSubmit={onCreateNote}
                            onAddTag={onAddTag}
                            availableTags={tags}
                        />
                    }
                />
                <Route path='/:id'>
                    <Route index element={<h1>show</h1>} />
                    <Route path='edit' element={<h1>edit</h1>} />
                </Route>
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </Container>
    );
}

export default App;
