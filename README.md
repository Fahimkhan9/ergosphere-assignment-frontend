
# 📄 RAG-based Document QA API (Django + Gemini + ChromaDB)

[Backend Repo](https://example.com)

This project implements a document upload and question-answering (QA) system using:

- **Django** + **Django REST Framework** for the API backend
- **Gemini 1.5 Flash** for question answering (via `google-generativeai`)
- **ChromaDB** as the vector store
- Fake embeddings (as Gemini doesn't provide native embeddings)

## 📦 Features

- Upload `.txt` files
- Automatically chunk and embed documents into ChromaDB
- Ask questions against uploaded documents
- Retrieve answers from the most relevant chunks using Gemini

---

## ⚙️ API Endpoints

### 🔹 1. Upload Document

**POST** `/api/documents/upload/`

Upload a `.txt` file which gets chunked, embedded, and indexed in ChromaDB.

#### Request (FormData):
```bash
file: document.txt
```

#### Example:
```bash
curl -X POST http://localhost:8000/api/documents/upload/   -F "file=@sample.txt"
```

#### Response:
```json
{
  "message": "Uploaded and processing started",
  "document_id": 1
}
```

---

### 🔹 2. List All Documents

**GET** `/api/documents/`

Returns a list of all uploaded documents with metadata.

#### Example:
```bash
curl http://localhost:8000/api/documents/
```

#### Response:
```json
[
  {
    "id": 1,
    "title": "sample.txt",
    "file_type": "txt",
    "file_size": 2048,
    "status": "completed",
    "processed_at": "2025-05-28T08:34:23Z"
  }
]
```

---

### 🔹 3. Ask a Question

**POST** `/api/ask/`

Ask a natural language question about a previously uploaded document.

#### Request Body:
```json
{
  "document_id": 1,
  "question": "What is the purpose of mitosis?",
  "top_k": 3
}
```

#### Example:
```bash
curl -X POST http://localhost:8000/api/ask/   -H "Content-Type: application/json"   -d '{"document_id": 1, "question": "What is cell division?"}'
```

#### Response:
```json
{
  "answer": "Cell division is the process by which a cell divides into two daughter cells..."
}
```


## 📁 Project Structure

```
/api
  ├── models.py         # Document & DocumentChunk models
  ├── views.py          # Upload, list, ask question endpoints
  ├── rag_engine.py     # ChromaDB + Gemini chunking & QA logic
  ├── serializers.py
```

---



## ✨ Credits

Built with ❤️ using Django, Gemini, ChromaDB, and Tailwind + Next.js frontend.
