## Running the Eco Elder service with Docker:

### This walk-through uses the following tools, and has the following config!
```bash
    #Docker versions:
    docker version
    # I am running 26.0.1
    
    docker compose version
    # I am running 2.26.1
    
    
    #Docker group setup
    sudo groupadd docker
    sudo usermod -aG docker $USER
    newgrp docker
    # You should probably restart the machine here to ensure your group is set, or you can restart after the next installs!
    
    sudo apt-get update
    
    # Downloading unzip
    sudo apt-get install unzip
    
    # Downloading git
    sudo apt-get install git-all
    
    
```
### After restart:
```bash
    #From your home directory run
    git clone https://github.com/eco-elders-email-campaign/eco-elders-email-campaign.git
    
    cd eco-elders-email-campaign/parserfiles/
    
    wget -q # Wait around 20 seconds, for the file to download
    unzip 'Statewide-Voter-File_2024-04-10.zip'
    # Then press enter
    mv 'Statewide Voter File_2024-04-10.csv' voterfile.csv
    #Then as cleanup: 
    rm 'Statewide-Voter-File_2024-04-10.zip'
    
    cd ..
    #Then we change the owner of the Voterfile & current line pointer:
    sudo chown 1001 parserfiles -R
    
    #Now we want to build the docker container
    docker compose build
    
    #once build has completed:
    
    docker compose up
    
    
```

### The other commands that might be helpful
```bash
    # CTRL P + CTRL Z will escape the docker command-line
    
    #To properly stop a docker compose container:
    docker compose down
    
    #For space cleanup:
   docker image prune  
   docker container prune
   docker volume prune


```

[//]: # (## Getting Started)

[//]: # ()
[//]: # (First, run the development server:)

[//]: # ()
[//]: # (```bash)

[//]: # (npm run dev)

[//]: # (# or)

[//]: # (yarn dev)

[//]: # (# or)

[//]: # (pnpm dev)

[//]: # (# or)

[//]: # (bun dev)

[//]: # (```)

[//]: # ()
[//]: # (Open [http://localhost:3000]&#40;http://localhost:3000&#41; with your browser to see the result.)

[//]: # ()
[//]: # (You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.)

[//]: # ()
[//]: # (This project uses [`next/font`]&#40;https://nextjs.org/docs/basic-features/font-optimization&#41; to automatically optimize and load Inter, a custom Google Font.)

[//]: # ()
[//]: # (## Learn More)

[//]: # ()
[//]: # (To learn more about Next.js, take a look at the following resources:)

[//]: # ()
[//]: # (- [Next.js Documentation]&#40;https://nextjs.org/docs&#41; - learn about Next.js features and API.)

[//]: # (- [Learn Next.js]&#40;https://nextjs.org/learn&#41; - an interactive Next.js tutorial.)

[//]: # ()
[//]: # (You can check out [the Next.js GitHub repository]&#40;https://github.com/vercel/next.js/&#41; - your feedback and contributions are welcome!)
