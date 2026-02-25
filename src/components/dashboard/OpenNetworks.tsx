import { motion } from "framer-motion";
import { Globe, ExternalLink, BookOpen, Code, Newspaper, Database, Wrench } from "lucide-react";

interface NetworkResource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
}

const networkResources: NetworkResource[] = [
  {
    id: "1",
    name: "Hacker News",
    description: "Tech news aggregator with high signal-to-noise ratio",
    url: "https://news.ycombinator.com",
    category: "Free Media",
    tags: ["tech", "news", "community"],
  },
  {
    id: "2",
    name: "Lobsters",
    description: "Computing-focused community with invite-only membership",
    url: "https://lobste.rs",
    category: "Free Media",
    tags: ["programming", "community"],
  },
  {
    id: "3",
    name: "arXiv",
    description: "Open access to 2+ million scientific papers",
    url: "https://arxiv.org",
    category: "Research Archives",
    tags: ["science", "papers", "academic"],
  },
  {
    id: "4",
    name: "Internet Archive",
    description: "Digital library of Internet sites and cultural artifacts",
    url: "https://archive.org",
    category: "Research Archives",
    tags: ["archive", "history", "digital"],
  },
  {
    id: "5",
    name: "MDN Web Docs",
    description: "Resources for developers, by developers",
    url: "https://developer.mozilla.org",
    category: "Engineering Resources",
    tags: ["web", "documentation", "reference"],
  },
  {
    id: "6",
    name: "System Design Primer",
    description: "Learn how to design large-scale systems",
    url: "https://github.com/donnemartin/system-design-primer",
    category: "Engineering Resources",
    tags: ["system-design", "learning"],
  },
  {
    id: "7",
    name: "Project Gutenberg",
    description: "70,000+ free eBooks",
    url: "https://www.gutenberg.org",
    category: "Open Libraries",
    tags: ["books", "literature", "free"],
  },
  {
    id: "8",
    name: "Open Library",
    description: "One web page for every book ever published",
    url: "https://openlibrary.org",
    category: "Open Libraries",
    tags: ["books", "catalog"],
  },
  {
    id: "9",
    name: "Regex101",
    description: "Build, test, and debug regex",
    url: "https://regex101.com",
    category: "Developer Tools",
    tags: ["regex", "testing", "tools"],
  },
  {
    id: "10",
    name: "JSON Crack",
    description: "Visualize JSON data into graphs",
    url: "https://jsoncrack.com",
    category: "Developer Tools",
    tags: ["json", "visualization", "tools"],
  },
];

const categoryIcons: Record<string, React.ElementType> = {
  "Free Media": Newspaper,
  "Research Archives": Database,
  "Engineering Resources": Code,
  "Open Libraries": BookOpen,
  "Developer Tools": Wrench,
};

export function OpenNetworks() {
  const categories = Array.from(new Set(networkResources.map((r) => r.category)));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Open Networks</h2>
        <p className="text-sm text-muted-foreground">Curated index of public internet resources</p>
      </div>

      <div className="space-y-8">
        {categories.map((category, categoryIndex) => {
          const Icon = categoryIcons[category] || Globe;
          const resources = networkResources.filter((r) => r.category === category);

          return (
            <div key={category}>
              <div className="flex items-center gap-2 mb-4">
                <Icon className="w-5 h-5 text-cyber-cyan" />
                <h3 className="text-lg font-semibold text-foreground">{category}</h3>
                <span className="text-xs px-2 py-1 rounded-full border border-cyber-cyan/30 text-cyber-cyan">
                  {resources.length}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {resources.map((resource, index) => (
                  <motion.a
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: categoryIndex * 0.1 + index * 0.05 }}
                    className="group relative p-4 rounded-lg bg-cyber-graphite/50 border border-cyber-cyan/10 hover:border-cyber-cyan/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-foreground group-hover:text-cyber-cyan transition-colors">
                          {resource.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {resource.description}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {resource.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-cyber-black/50 text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}