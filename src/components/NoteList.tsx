import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';
import { SimplifiedNote, Tag } from '../App';
import { useMemo, useState } from 'react';
import NoteCard from './NoteCard';
import EditTagsModal from './EditTagsModal';

interface NoteListProps {
    availableTags: Tag[];
    notes: SimplifiedNote[];
    deleteTag: (id: string) => void;
    updateTag: (id: string, label: string) => void;
}

const NoteList = ({
    availableTags,
    notes,
    deleteTag,
    updateTag,
}: NoteListProps) => {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);

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
                        <Button
                            variant='outline-secondary'
                            onClick={() => setShowModal(true)}
                        >
                            Edit Tags
                        </Button>
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
            <EditTagsModal
                show={showModal}
                availableTags={availableTags}
                handleClose={() => {
                    setShowModal(false);
                }}
                onUpdateTag={updateTag}
                onDeleteTag={deleteTag}
            ></EditTagsModal>
        </>
    );
};
export default NoteList;
