import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';
import { SimplifiedNote, Tag } from '../App';
import { useMemo, useState } from 'react';
import NoteCard from './NoteCard';

interface NoteListProps {
    availableTags: Tag[];
    notes: SimplifiedNote[];
}

const NoteList = ({ availableTags, notes }: NoteListProps) => {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState<string>('');

    const filteredNotes = useMemo(
        () =>
            notes.filter(
                (note) =>
                    (title === '' ||
                        note.title
                            .toLocaleLowerCase()
                            .includes(title.toLocaleLowerCase())) &&
                    (selectedTags.length === 0 ||
                        selectedTags.every((tag) =>
                            note.tags.some((noteTag) => noteTag.id === tag.id)
                        ))
            ),
        [title, notes, selectedTags]
    );

    return (
        <>
            <Row className='align-items-center mb-4'>
                <Col>
                    <h1>Notes</h1>
                </Col>
                <Col xs='auto'>
                    <Stack direction='horizontal' gap={2}>
                        <Link to='/new'>
                            <Button variant='primary'>Create</Button>
                        </Link>
                        <Button variant='outline-secondary'>Edit Tags</Button>
                    </Stack>
                </Col>
            </Row>
            <Form>
                <Row className='mb-4'>
                    <Col>
                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type='text'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='tags'>
                            <Form.Label>Tags</Form.Label>
                            <ReactSelect
                                isMulti
                                options={availableTags.map((t) => ({
                                    label: t.label,
                                    value: t.id,
                                }))}
                                value={selectedTags.map((t) => ({
                                    label: t.label,
                                    value: t.id,
                                }))}
                                onChange={(tags) =>
                                    setSelectedTags(
                                        tags.map((t) => ({
                                            label: t.label,
                                            id: t.value,
                                        }))
                                    )
                                }
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Row xs={1} sm={2} lg={3} xl={4} className='g-3'>
                {filteredNotes.map((note) => (
                    <Col key={note.id}>
                        <NoteCard
                            id={note.id}
                            title={note.title}
                            tags={note.tags}
                        />
                    </Col>
                ))}
            </Row>
        </>
    );
};
export default NoteList;
