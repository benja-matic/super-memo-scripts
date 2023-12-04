export default [
    // AMP
    {
        "question": "What line of pytorch code can be used to cast the model weights to half precision on the GPU during a training step?",
        "answer": "`with torch.autocast(device_type='cuda', dtype=torch.float16)`"
    },
    {
        "question": "With torch automatic mixed precision, when you load the model, what precision are the weights loaded in?",
        "answer": "float32"
    },
    {
        "question": "With torch automatic mixed precision, what precision are the gradients usually calculated in?",
        "answer": "float32"
    },
    {
        "question": "When using torch AMP, after you load the model and the optimizer, what additional object must be created for mixed precision training?",
        "answer": "torch.cuda.amp.GradScaler()"
    },
    {
        "question": "What additional two lines of code are needed using torch amp after computing the gradients using mixed precision?",
        "answer": "`grad_scaler.scale(loss).backward()` and `scaler.step(optimizer)`"
    },
    {
        "question": "What 5 operations must be done in a typical pytorch training loop?",
        "answer": "Zero gradients, forward pass, compute loss, backward pass, optimizer step"
    },
    {
        "question": "When using torch AMP, what additional step must be added to a typical training loop?",
        "answer": "Call the gradient scaler before the backward pass, scaler.step(optimizer) after the backward pass, and scaler.update() after the optimizer step"
    },
    {
        "question": "If you are using torch AMP and want to clip gradients, what additional steps must be added to a typical training AMP training loop?",
        "answer": "After backward pass, call scaler.unscale_(optimizer), then call torch.nn.utils.clip_grad_norm_(model.parameters(), **kwargs). Then standard calls to scaler.step(optimizer) and scaler.update() are used."
    },
    {
        "question": "What typical modifications must be made to a pytorch training loop when using gradient accumulation?",
        "answer": "Do not zero the gradients at the start of the loop, check if a gradient update step has been reached, and only step the optimizer and zero the gradients if so. For example, `if (i + 1) % iters_to_accumulate == 0:  ...`"
    },
    {
        "question": "How would you modify a typical gradeint accumulation training loop to use torch AMP?",
        "answer": "Under the if statement that checks if it is time to update weights, call `scaler.step(optimizer)` and `scaler.update()`. The standard call to zero grads follows."
    },
    // Batch sizes: compute usage, generalization, theories
    {
        "question": "What known and agreed-upon advantages do large batch sizes have over smaller batch sizes?",
        "answer": "Lower variance gradient estimates, faster convergence due to better hardware utilization, reduced frequency of calling a dataloader which can be a bottleneck."
    },
    {
        "question": "In some famous papers from around 2015-2018, what was the association between batch size and generalization?",
        "answer": "Larger batch sizes were associated with worse generalization."
    },
    {
        "question": "In the paper 'Implicit Self-Regularization in Deep Neural Networks: Evidence from Random Matrix Theory and Implications for Learning', what explained the difference in generalization between large and small batch sizes?",
        "answer": "Smaller batches are associated with stronger self-regularization",
    },
    {
        "question": "In the paper 'Implicit Self-Regularization in Deep Neural Networks: Evidence from Random Matrix Theory and Implications for Learning', how is self-regularization measured?",
        "answer": "Capacity control metrics like Matrix Entropy, Hard Rank, Stable Rank, and MP Soft Rank. MP Soft Rank looks at the distribution of eigenvalues and measures the ratio of the largest eigenvalue in the bulk to the largest overall eigenvalue"
    },
    {
        "question": "In the paper 'Implicit Self-Regularization in Deep Neural Networks: Evidence from Random Matrix Theory and Implications for Learning', what happens to MP Softrank in the successive phases of training? What happens to it as a function of batch size?",
        "answer": "MP Soft Rank decreases in each phase of training. Smaller batch sizes are associated with smaller MP Soft Rank, and therefore more implicit self-regularization."
    },
    {
        "question": "What are some reasons to use gradient accumulation?",
        "answer": "To simulate a larger batch size and possibly to keep the a desired (effective) batch size and learning rate configuration, without OOMing."
    },
    {
        "question": "When using gradient accumulation and data parallel training, what is the effective batch size?",
        "answer": "accmulation_steps * batch_size * num_gpus"
    },
    {
        "question": "What problem was gradient penalty designed to solve?",
        "answer": "The problems of training instability in GANs and gradient clipping causing lower quality results."
    },
    {
        "question": "Provide a typical gradient penalty loss function for loop",
        "answer": "`grad_params = torch.autograd.grad(outputs=loss, inputs=model.parameters(), create_graph=True); grad_norm = 0; for gp in grad_params: grad_norm += gp.pow(2).sum(); loss += lambda_gp * grad_norm`"
    },
    {
        "question": "What are some techniques to mitigate gradient instability?",
        "answer": "Gradient penalty, frequent checkpointing, gradient clipping, larger batch size / gradient accumulation, lower learning rate"
    },
    {
        "question": "What are the advantages of mixed precision training?",
        "answer": "Faster training, lower memory usage, and similarly, larger batch sizes"
    },
    // Batch norm
    {
        "question": "What problem was batch normalization designed to solve?",
        "answer": "Internal covariate shift"
    },
    {
        "question": "Write the equation for the forward method of a batch norm layer, using x as the normalized input.",
        "answer": "y = gamma * x + beta"
    },
    {
        "question": "Write the equation for computing the normalized input in batch norm",
        "answer": "x = (x - mean) / sqrt(var + eps)"
    },
    {
        "question": "How is batch norm different at training time vs inference time?",
        "answer": "At training time, the mean and variance are computed based on the minibatch. At inference time, the mean and variance are computed based on the entire training set."
    },
    {
        "question": "What is the difference between batch norm and layer norm?",
        "answer": "Batch norm normalizes over the batch dimension, while layer norm normalizes over the feature dimension."
    },
    {
        "question": "Why use layernorm instead of batch norm?",
        "answer": "Layer norm is more stable for small batch sizes and for RNNs."
    },
    {
        "question": "How many parameters are in bert-base-cased?",
        "answer": "108M",
    },
    {
        "question": "Of the parameters in bert-base-cased, how many are embedding parameters?",
        "answer": "23.8M",
    },
    {
        "question": "how many tokens are in the bert-base-cased vocabulary?",
        "answer": "28996",
    },
    {
        "question": "What heuristic is used to estimate the total memory usage of a model during training?",
        "answer": "(3 * (num_params * 4 + num_activations * 4)) * batch_size"
    },
    // Other stuff to add:
    // torch ddp
    // torch model parallelism
    // deepspeed and accelerators
    // torch distributed
    // torch compile
]
