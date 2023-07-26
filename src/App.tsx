import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import NewNote from './components/NewNote';
import { useLocalStorage } from './hooks/UseLocalStorage';
import { useMemo } from 'react';
import { v4 } from 'uuid';
import NoteList from './components/NoteList';

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

export interface SimplifiedNote {
    id: string;
    title: string;
    tags: Tag[];
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
                <Route
                    path='/'
                    element={
                        <NoteList notes={noteWithTags} availableTags={tags} />
                    }
                />
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
