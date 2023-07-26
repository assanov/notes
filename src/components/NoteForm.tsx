import { FormEvent, useRef, useState } from 'react';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CreatableReactSelect from 'react-select/creatable';
import { NoteData, Tag } from '../App';
import { v4 } from 'uuid';

export interface NoteFormProps {
    onSubmit: (data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[];
}

export const NoteForm = ({
    onSubmit,
    onAddTag,
    availableTags,
}: NoteFormProps) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const navigate = useNavigate();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags,
        });

        navigate('..');
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control required ref={titleRef} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='tags'>
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect
                                isMulti
                                options={availableTags.map((t) => ({
                                    label: t.label,
                                    value: t.id,
                                }))}
                                onCreateOption={(label) => {
                                    const newTag = { id: v4(), label };
                                    onAddTag(newTag);
                                    setSelectedTags((prev) => [
                                        ...prev,
                                        newTag,
                                    ]);
                                }}
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
                <Row>
                    <Form.Group controlId='markdown'>
                        <Form.Label>Body</Form.Label>
                        <Form.Control
                            required
                            as='textarea'
                            rows={15}
                            ref={markdownRef}
                        />
                    </Form.Group>
                    <Stack
                        direction='horizontal'
                        gap={2}
                        className='justify-content-end mt-3'
                    >
                        <Button type='submit' variant='primary'>
                            Save
                        </Button>
                        <Link to='..'>
                            <Button type='button' variant='secondary'>
                                Cancel
                            </Button>
                        </Link>
                    </Stack>
                </Row>
            </Stack>
        </Form>
    );
};
