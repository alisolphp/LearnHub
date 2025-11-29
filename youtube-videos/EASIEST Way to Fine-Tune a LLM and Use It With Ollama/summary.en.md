# EASIEST Way to Fine-Tune a LLM and Use It With Ollama

* **Platform**: YouTube
* **Channel/Creator**: Tech With Tim 
* **Duration**: 00:22:03
* **Release Date**: Jun 27, 2025
* **Video Link**: [https://www.youtube.com/watch?v=pTaSDVz0gok](https://www.youtube.com/watch?v=pTaSDVz0gok)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=3bb5ce7c -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/EASIEST%20Way%20to%20Fine-Tune%20a%20LLM%20and%20Use%20It%20With%20Ollama) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/EASIEST%20Way%20to%20Fine-Tune%20a%20LLM%20and%20Use%20It%20With%20Ollama) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/EASIEST%20Way%20to%20Fine-Tune%20a%20LLM%20and%20Use%20It%20With%20Ollama) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/EASIEST%20Way%20to%20Fine-Tune%20a%20LLM%20and%20Use%20It%20With%20Ollama) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/EASIEST%20Way%20to%20Fine-Tune%20a%20LLM%20and%20Use%20It%20With%20Ollama) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/EASIEST%20Way%20to%20Fine-Tune%20a%20LLM%20and%20Use%20It%20With%20Ollama) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/EASIEST%20Way%20to%20Fine-Tune%20a%20LLM%20and%20Use%20It%20With%20Ollama) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/EASIEST%20Way%20to%20Fine-Tune%20a%20LLM%20and%20Use%20It%20With%20Ollama) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/EASIEST%20Way%20to%20Fine-Tune%20a%20LLM%20and%20Use%20It%20With%20Ollama) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/EASIEST%20Way%20to%20Fine-Tune%20a%20LLM%20and%20Use%20It%20With%20Ollama) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/EASIEST%20Way%20to%20Fine-Tune%20a%20LLM%20and%20Use%20It%20With%20Ollama) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/EASIEST%20Way%20to%20Fine-Tune%20a%20LLM%20and%20Use%20It%20With%20Ollama)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/EASIEST%20Way%20to%20Fine-Tune%20a%20LLM%20and%20Use%20It%20With%20Ollama) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/EASIEST%20Way%20to%20Fine-Tune%20a%20LLM%20and%20Use%20It%20With%20Ollama) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/EASIEST%20Way%20to%20Fine-Tune%20a%20LLM%20and%20Use%20It%20With%20Ollama) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/EASIEST%20Way%20to%20Fine-Tune%20a%20LLM%20and%20Use%20It%20With%20Ollama)
<!-- LH-BUTTONS:END -->

## What is Fine-Tuning and When to Use It
* **Summary**: Fine-tuning takes a pre-trained LLM like GPT or Claude and adapts it to excel at a specific task using your examples, such as customer service or legal docs. It's different from parameter tuning, which just tweaks settings like temperature. Use it for consistent output formats, domain-specific data the model hasn't seen, or to cut costs with smaller models. It requires less data and compute than training from scratch but can make the model worse at general tasks.
* **Key Takeaway/Example**: Think of it like training an experienced chef on your recipes—efficient but specialized. For instance, fine-tune for JSON outputs or handling medical records.
* **Link for More Details**: [Ask AI: Fine-Tuning LLMs](https://alisol.ir/?ai=Fine-Tuning%20LLMs%7CTech%20With%20Tim%7CEASIEST%20Way%20to%20Fine-Tune%20a%20LLM%20and%20Use%20It%20With%20Ollama)

## Gathering Your Dataset
* **Summary**: The dataset is crucial—bad data leads to poor results. Collect examples of inputs and desired outputs, like prompts and responses. The example uses AI-generated data for HTML extraction, with 500 JSON entries containing sample HTML inputs and formatted outputs (e.g., name, price, category, manufacturer).
* **Key Takeaway/Example**: Format as a list of dictionaries with "input" (prompt) and "output" (expected response as string). You can use real data like customer logs.
```json
{
  "input": "<div class='product'><h2>Product Name</h2><p class='price'>$99.99</p></div>",
  "output": "{\"name\": \"Product Name\", \"price\": \"$99.99\", \"category\": \"Electronics\", \"manufacturer\": \"BrandX\"}"
}
```
* **Link for More Details**: [Ask AI: Gathering Datasets for Fine-Tuning](https://alisol.ir/?ai=Gathering%20Datasets%20for%20Fine-Tuning%7CTech%20With%20Tim%7CEASIEST%20Way%20to%20Fine-Tune%20a%20LLM%20and%20Use%20It%20With%20Ollama)

## Using Unsloth for Fine-Tuning
* **Summary**: Unsloth is a free, open-source tool that's fast for fine-tuning LLMs. Run it in Python, ideally in Google Colab for free high-end GPUs like T4, or locally with a powerful NVIDIA GPU and CUDA.
* **Key Takeaway/Example**: Download the provided notebook, upload your dataset JSON, and follow the cells. It's quicker in Colab than locally unless you have a 4080/4090 GPU.
* **Link for More Details**: [Ask AI: Unsloth for LLM Fine-Tuning](https://alisol.ir/?ai=Unsloth%20for%20LLM%20Fine-Tuning%7CTech%20With%20Tim%7CEASIEST%20Way%20to%20Fine-Tune%20a%20LLM%20and%20Use%20It%20With%20Ollama)

## Installing Dependencies and Checking GPU
* **Summary**: In Colab, install Unsloth and dependencies with pip, then restart the runtime. Check for CUDA and GPU availability to ensure fast training.
* **Key Takeaway/Example**: Run commands like `!pip install unsloth` and verify with `torch.cuda.is_available()`—expect True and a GPU like Tesla T4 in Colab.
```python
import torch
print(torch.cuda.is_available())
print(torch.cuda.get_device_name())
```
* **Link for More Details**: [Ask AI: Installing Dependencies for Fine-Tuning](https://alisol.ir/?ai=Installing%20Dependencies%20for%20Fine-Tuning%7CTech%20With%20Tim%7CEASIEST%20Way%20to%20Fine-Tune%20a%20LLM%20and%20Use%20It%20With%20Ollama)

## Loading the Base Model
* **Summary**: Choose an open-source model like Phi-3 Mini (small and fast) or others like Llama 3.1. Load it with Unsloth's FastLanguageModel, setting max sequence length and 4-bit quantization.
* **Key Takeaway/Example**: Use `model, tokenizer = FastLanguageModel.from_pretrained(model_name, max_seq_length=2048, load_in_4bit=True)`. Larger models take longer to load and train.
```python
from unsloth import FastLanguageModel
model_name = "unsloth/Phi-3-mini-4k-instruct"
max_seq_length = 2048
model, tokenizer = FastLanguageModel.from_pretrained(model_name, max_seq_length=max_seq_length, load_in_4bit=True)
```
* **Link for More Details**: [Ask AI: Loading Base Models in Unsloth](https://alisol.ir/?ai=Loading%20Base%20Models%20in%20Unsloth%7CTech%20With%20Tim%7CEASIEST%20Way%20to%20Fine-Tune%20a%20LLM%20and%20Use%20It%20With%20Ollama)

## Preprocessing the Data
* **Summary**: Format your data into a single string per example with input, output, and an end-of-text token. Convert to a Hugging Face dataset for the trainer.
* **Key Takeaway/Example**: Define a prompt function to combine input and JSON-stringified output, then map over your data.
```python
def format_prompt(example):
    return f"{example['input']}\n{json.dumps(example['output'])}\n<|endoftext|>"
formatted_data = [format_prompt(ex) for ex in data]
dataset = Dataset.from_dict({"text": formatted_data})
```
* **Link for More Details**: [Ask AI: Preprocessing Data for Fine-Tuning](https://alisol.ir/?ai=Preprocessing%20Data%20for%20Fine-Tuning%7CTech%20With%20Tim%7CEASIEST%20Way%20to%20Fine-Tune%20a%20LLM%20and%20Use%20It%20With%20Ollama)

## Applying LoRA Adapters
* **Summary**: Add LoRA (Low-Rank Adaptation) layers to the model for efficient fine-tuning without changing the whole model.
* **Key Takeaway/Example**: Use Unsloth's get_peft_model with parameters like rank (r=16) and target modules for layers like q_proj, v_proj.
```python
model = FastLanguageModel.get_peft_model(
    model,
    r=16,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"],
    lora_alpha=16,
    lora_dropout=0,
    bias="none",
    use_gradient_checkpointing="unsloth",
    random_state=3407,
    use_rslora=False,
    loftq_config=None
)
```
* **Link for More Details**: [Ask AI: LoRA Adapters in Fine-Tuning](https://alisol.ir/?ai=LoRA%20Adapters%20in%20Fine-Tuning%7CTech%20With%20Tim%7CEASIEST%20Way%20to%20Fine-Tune%20a%20LLM%20and%20Use%20It%20With%20Ollama)

## Training the Model
* **Summary**: Set up the SFTTrainer with your model, tokenizer, dataset, and training args like batch size and epochs. Run trainer.train()—time varies by dataset size and model (e.g., 10 minutes for small setup).
* **Key Takeaway/Example**: More examples and epochs improve results, but start small to test.
```python
from trl import SFTTrainer
from transformers import TrainingArguments
trainer = SFTTrainer(
    model=model,
    tokenizer=tokenizer,
    train_dataset=dataset,
    dataset_text_field="text",
    max_seq_length=max_seq_length,
    args=TrainingArguments(
        per_device_train_batch_size=2,
        gradient_accumulation_steps=4,
        warmup_steps=5,
        num_train_epochs=1,
        learning_rate=2e-4,
        fp16=not torch.cuda.bf16_supported(),
        bf16=torch.cuda.bf16_supported(),
        logging_steps=1,
        optim="adamw_8bit",
        weight_decay=0.01,
        lr_scheduler_type="linear",
        seed=3407,
        output_dir="outputs"
    )
)
trainer.train()
```
* **Link for More Details**: [Ask AI: Training LLMs with Unsloth](https://alisol.ir/?ai=Training%20LLMs%20with%20Unsloth%7CTech%20With%20Tim%7CEASIEST%20Way%20to%20Fine-Tune%20a%20LLM%20and%20Use%20It%20With%20Ollama)

## Testing the Model in Colab
* **Summary**: After training, set the model for inference and test with sample prompts to verify outputs match expectations.
* **Key Takeaway/Example**: Use messages in chat format; adjust for your data. Outputs may vary slightly due to small datasets.
```python
messages = [{"role": "user", "content": "Extract info from this HTML: <div class='product'>..."}]
inputs = tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
inputs = tokenizer(inputs, return_tensors="pt").to("cuda")
outputs = model.generate(**inputs, max_new_tokens=200, use_cache=True)
print(tokenizer.batch_decode(outputs))
```
* **Link for More Details**: [Ask AI: Testing Fine-Tuned Models](https://alisol.ir/?ai=Testing%20Fine-Tuned%20Models%7CTech%20With%20Tim%7CEASIEST%20Way%20to%20Fine-Tune%20a%20LLM%20and%20Use%20It%20With%20Ollama)

## Saving and Downloading the Model
* **Summary**: Save the model in GGUF format for Ollama compatibility, then download from Colab (can take 10-25 minutes).
* **Key Takeaway/Example**: Use `model.save_pretrained_gguf("unsloth.Q4_K_M.gguf", tokenizer, quantization_method="q4_k_m")`. Download via Colab's files.download().
* **Link for More Details**: [Ask AI: Saving Models for Ollama](https://alisol.ir/?ai=Saving%20Models%20for%20Ollama%7CTech%20With%20Tim%7CEASIEST%20Way%20to%20Fine-Tune%20a%20LLM%20and%20Use%20It%20With%20Ollama)

## Loading and Running in Ollama
* **Summary**: Create a Modelfile pointing to your GGUF file, set parameters like temperature, and define a template. Use `ollama create` to add it, then `ollama run` to interact locally.
* **Key Takeaway/Example**: Modelfile example:
```
FROM ./unsloth.Q4_K_M.gguf
PARAMETER top_p 0.7
PARAMETER temperature 0.7
PARAMETER stop "User:"
PARAMETER stop "<|endoftext|>"
TEMPLATE "{{ .Prompt }}"
SYSTEM "You are a helpful AI assistant."
```
Run `ollama create html-model -f Modelfile` and test prompts in the Ollama CLI.
* **Link for More Details**: [Ask AI: Running Fine-Tuned Models in Ollama](https://alisol.ir/?ai=Running%20Fine-Tuned%20Models%20in%20Ollama%7CTech%20With%20Tim%7CEASIEST%20Way%20to%20Fine-Tune%20a%20LLM%20and%20Use%20It%20With%20Ollama)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
