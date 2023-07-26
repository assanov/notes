import { Badge, Button, Col, Row, Stack } from 'react-bootstrap';
import { useNote } from './NoteLayout';
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

interface NoteProps {
    onDeleteNote: (id: string) => void;
}

const Note = ({ onDeleteNote }: NoteProps) => {
    const note = useNote();
    const navigate = useNavigate();
    return (
        <>
            <Row className='align-items-center mb-4'>
                <Col>
                    <h1>{note.title}</h1>
                    {note.tags.length > 0 && (
                        <Stack
                            direction='horizontal'
                            gap={2}
                            className='flex-wrap'
                        >
                            {note.tags.map((t) => (
                                <Badge key={t.id} className='text-truncate'>
                                    {t.label}
                                </Badge>
                            ))}
                        </Stack>
                    )}
                </Col>
                <Col xs='auto'>
                    <Stack
                        direction='horizontal'
                        gap={2}
                        className='flex flex-end'
                    >
                        <Link to={`/${note.id}/edit`}>
                            <Button variant='primary'>Edit</Button>
                        </Link>
                        <Button
                            variant='outline-danger'
                            onClick={() => {
                                onDeleteNote(note.id);
                                navigate('..');
                            }}
                        >
                            Delete
                        </Button>
                        <Link to={`..`}>
                            <Button variant='outline-secondary'>Back</Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>
            <ReactMarkdown>{note.markdown}</ReactMarkdown>
        </>
    );
};
export default Note;
