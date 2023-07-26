import { Badge, Button, Col, Row, Stack } from 'react-bootstrap';
import { useNote } from './NoteLayout';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const Note = () => {
    const note = useNote();
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
                        <Button variant='outline-danger'>Delete</Button>
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