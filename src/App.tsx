import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import NewNote from './components/NewNote';
import { useLocalStorage } from './hooks/UseLocalStorage';
import { useMemo } from 'react';
import { v4 } from 'uuid';
import NoteList from './components/NoteList';
import NoteLayout from './components/NoteLayout';
import Note from './components/Note';
import EditNote from './components/EditNote';

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

    function onUpdateNote(id: string, { tags, ...data }: NoteData) {
        setNotes((prev) =>
            prev.map((note) => {
                if (note.id === id) {
                    return {
                        ...note,
                        ...data,
                        tagIds: tags.map((tag) => tag.id),
                    };
                } else {
                    return note;
                }
            })
        );
    }

    function onDeleteNote(id: string) {
        setNotes((prev) => prev.filter((n) => n.id !== id));
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
                <Route
                    path='/:id'
                    element={<NoteLayout notes={noteWithTags} />}
                >
                    <Route
                        index
                        element={<Note onDeleteNote={onDeleteNote} />}
                    />
                    <Route
                        path='edit'
                        element={
                            <EditNote
                                onSubmit={onUpdateNote}
                                onAddTag={onAddTag}
                                availableTags={tags}
                            />
                        }
                    />
                </Route>
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </Container>
    );
}

export default App;
